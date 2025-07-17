import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserAuth } from "../models/userAuth.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../middleware/auth.js";


const login = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"Both email and password are required");
    }

    const user = await UserAuth.findOne({ where: { email } });

    if(!user)
    {
        throw new ApiError(404,'User not found')
    }

    const checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword)
    {
        throw new ApiError(401,"Incorrect Password");
    }

    const accessToken = await generateAccessToken({id:user.id,email,expiresIn:process.env.ACCESS_TOKEN_EXPIRY});

    const loggedInUser = await UserAuth.findByPk(user.id,{
    attributes: ['id', 'name', 'email', 'userType']
    });

    const options = {
        httpOnly: true, // cookies can be modified only by server
        secure: false    
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(
            200,
            {
                data: loggedInUser,accessToken
            },
            "User logged in succesfully"
        )
    )
})

const logout = asyncHandler(async(req,res)=>{
    const options = {
        httpOnly: true,
        secure: true    
    }

    return res
    .status(200)
    .clearCookie("accessToken",options) 
    .json(new ApiResponse(200,{},"User logged Out"))
})

const changePassword = asyncHandler(async(req,res)=>{
    const id = req.data?.id;
    if(!id)
    {
        throw new ApiError(401,"User not authenticated")
    }
    const {oldPassword,newPassword} = req.body;
    const user = await UserAuth.findByPk(id);

    if(!user)
    {
        throw new ApiError(404,"User not found");
    }

    const checkPassword = await bcrypt.compare(oldPassword,user.password);

    if(!checkPassword)
    {
        throw new ApiError(401,"Old password is Incorrect");
    }

    if(!oldPassword || !newPassword)
    {
        throw new ApiError(400,"Both fields are required");
    }

    if(oldPassword == newPassword)
    {
        throw new ApiError(400,"New password must be different from old password");
    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json(
        new ApiResponse(200,{},"Password changed successfully")
    )
})

export {login,logout,changePassword}



