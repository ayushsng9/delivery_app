import express from "express";
import { sendOtp, verifyOtp, logoutUser, getProfile } from "../../../controllers/user.auth.otp.controller.js";
import { verifyUserJwt,isAuthenticatedUser } from "../../../middleware/userauth.js";


const app = express.Router();


app.post("/send-otp", sendOtp);

app.post("/verify-otp", verifyOtp);

app.get("/profile", verifyUserJwt, isAuthenticatedUser, getProfile);

app.post("/logout", verifyUserJwt, isAuthenticatedUser, logoutUser);

export default app;



