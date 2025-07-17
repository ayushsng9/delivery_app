import { Router } from "express";
import {addSociety,getSociety,editSociety,deleteSociety,getTowersBySociety} from "../../../controllers/societyMaster.controller.js";
import { isAdmin, verifyJwt } from "../../../middleware/auth.js";

const router = Router();

router.route("/")   //https://localhost:3000/api/v1/society
        .post(verifyJwt,isAdmin,addSociety)           

router.route("/:id")
        .get(verifyJwt,isAdmin,getSociety)
        .put(verifyJwt,isAdmin,editSociety)
        .delete(verifyJwt,isAdmin,deleteSociety)

router.route("/:id/hubs")
        .get(verifyJwt,isAdmin,getTowersBySociety)

export default router;
