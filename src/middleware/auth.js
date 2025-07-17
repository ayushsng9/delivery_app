import jwt from 'jsonwebtoken'
import {ApiError} from '../utils/ApiError.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import { UserAuth } from '../models/userAuth.js';

const generateAccessToken = async (payload) => {
    try {
        const { expiresIn, ...params } = payload;
        return jwt.sign(params, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: expiresIn || "1d"
        });
    } catch (error) {
        throw new ApiError(500, "Failed to generate access token");
    }
};

const verifyJwt = asyncHandler(async(req,res,next) =>{
    
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("bearer ","")
    if(!token)
    {
        throw new ApiError(401,"Unauthorized request")
    }
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const user = await UserAuth.findByPk(decoded?.id,{
        attributes:['id','name','email','userType']
    })

    if(!user)
    {
        throw new ApiError('Invalid Token')
    }

    req.data = user;
    next();
})

const isAdmin = asyncHandler(async(req,res,next)=>{
    const user = req.data;

    if (!user) {
    throw new ApiError(401, "User not authenticated");
    }

    if(user.userType === "admin")
    {
        return next();
    }

    else
    {
        throw new ApiError(403,"Unauthorized access : Admins only")
    }
})

const isAgent = asyncHandler(async(req,res,next)=>{
    const user = req.data;
    
    if (!user) {
    throw new ApiError(401, "User not authenticated");
    }

    if(user.userType === "agent")
    {
        return next();
    }

    else
    {
        throw new ApiError(403,"Unauthorized access : Agents only")
    }
})

const isUser = asyncHandler(async(req,res,next)=>{
    const user = req.data;
    
    if (!user) {
    throw new ApiError(401, "User not authenticated");
    }

    if(user.userType === "user")
    {
        return next();
    }

    else
    {
        throw new ApiError(403,"Unauthorized access : Users only")
    }
})



export {generateAccessToken,verifyJwt,isAdmin,isAgent,isUser}

