import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserMaster from "../models/userMaster.js";
import { generateUserToken } from "../middleware/userauth.js";
import client from "../config/twillo.js";
import generateOtp from "../utils/otp_generator.js";

const sendOtp = asyncHandler(async (req, res) => {
  const { mobileNo } = req.body;

  const otp = generateOtp();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  let user = await UserMaster.findOne({ where: { mobileNo } });
  if (!user) {
    user = await UserMaster.create({ mobileNo, userType: "user" }); // Default role USER
  }

  user.otp = otp;
  user.otp_expiry = expiry;
  await user.save();

  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE, // Twilio verified number
    to: mobileNo,
  });

  return res.status(200).json(new ApiResponse(200, {}, "OTP sent successfully"));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { mobileNo, otp } = req.body;

  const user = await UserMaster.findOne({ where: { mobileNo } });
  if (!user) throw new ApiError(404, "User not found");

  if (user.otp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }

  if (new Date() > new Date(user.otp_expiry)) {
    throw new ApiError(401, "OTP has expired");
  }

  user.otp = null;
  user.otp_expiry = null;
  await user.save();

  const token = await generateUserToken({
    id: user.userId,
    mobileNo: user.mobileNo,
    userType: user.userType,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
  });

  const options = { httpOnly: true, secure: false };

  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse(200, { accessToken: token }, "User logged in successfully")
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.data?.userId;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const user = await UserMaster.findByPk(userId, {
    attributes: ["userId", "mobileNo", "userType"],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User profile fetched successfully"));
});

export { sendOtp, verifyOtp, logoutUser, getProfile };