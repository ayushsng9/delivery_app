import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import UserMaster from '../models/userMaster.js';


const generateUserToken = async (payload) => {
  try {
    const { expiresIn, ...params } = payload;
    return jwt.sign(params, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: expiresIn || '1d', 
    });
  } catch (error) {
    throw new ApiError(500, 'Failed to generate token');
  }
};


const verifyUserJwt = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new ApiError(401, 'Unauthorized request: No token');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired token');
  }

  const user = await UserMaster.findOne({
    where: { userId: decoded.id, mobileNo: decoded.mobileNo },
    attributes: ['userId', 'mobileNo', ],
  });

  if (!user) {
    throw new ApiError(401, 'User not found');
  }

  req.data = {
    userId: user.userId,
    mobileNo: user.mobileNo,
    address: user.address,
    userType: user.userType,
  };

  next();
});


const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  
  if (!req.data || !req.data.userId || !req.data.mobileNo) {
    throw new ApiError(401, 'User not authenticated');
  }

  next();  
});




export { generateUserToken, verifyUserJwt,isAuthenticatedUser };
