import { Router } from "express";
import {login,logout,changePassword} from "../../../controllers/auth.controller.js"
import { verifyJwt } from "../../../middleware/auth.js";

const router = Router();

router.route("/login")
    .post(login)

router.route("/logout")
    .post(verifyJwt,logout)

router.route("/password/change")
    .post(verifyJwt,changePassword)

export default router;