import express from "express";
import { sendOtp, verifyOtp, logoutUser, getProfile } from "../../../controllers/user.auth.otp.controller.js";
import { verifyUserJwt,isAuthenticatedUser } from "../../../middleware/userauth.js";
import { validationMiddleware, otpSchema } from "../../../middleware/joi.validation.js";

const app = express.Router();

app.post("/send-otp", validationMiddleware(otpSchema.sendOtp), sendOtp);

app.post("/verify-otp", validationMiddleware(otpSchema.verifyOtp), verifyOtp);

app.get("/profile", verifyUserJwt, isAuthenticatedUser, getProfile);

app.post("/logout", verifyUserJwt, isAuthenticatedUser, logoutUser);

export default app;