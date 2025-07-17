import { Router } from "express";
import {addHub,editHub,deleteHub,getHub,getClustersByHub} from "../../../controllers/hubMaster.controller.js";
import { isAdmin, verifyJwt } from "../../../middleware/auth.js";

const router = Router();

router.route("/")   //https://localhost:3000/api/v1/hub
        .post(verifyJwt,isAdmin,addHub)           

router.route("/:id")
        .get(verifyJwt,isAdmin,getHub)
        .put(verifyJwt,isAdmin,editHub)
        .delete(verifyJwt,isAdmin,deleteHub)

router.route("/:id/hubs")
        .get(verifyJwt,isAdmin,getClustersByHub)


export default router