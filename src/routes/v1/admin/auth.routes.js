import { Router } from "express";
import {login,logout,changePassword} from "../../../controllers/auth.controller.js"
import { verifyJwt } from "../../../middleware/auth.js";
import { validationMiddleware, authSchema } from "../../../middleware/joi.validation.js";

const router = Router();

router.route("/login")
    .post(validationMiddleware(authSchema.login), login)

router.route("/logout")
    .post(verifyJwt,logout)

router.route("/password/change")
    .post(verifyJwt, validationMiddleware(authSchema.changePassword), changePassword)

export default router;