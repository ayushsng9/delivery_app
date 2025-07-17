import { Router } from "express";
import {addCluster,editCluster,deleteCluster,getCluster,getSocietiesByCluster} from "../../../controllers/clusterMaster.controller.js"
import { isAdmin, verifyJwt } from "../../../middleware/auth.js";
const router = Router();

router.route("/")   //https://localhost:3000/api/v1/cluster
        .post(verifyJwt,isAdmin,addCluster)

router.route("/:id")
        .get(verifyJwt,isAdmin,getCluster)
        .put(verifyJwt,isAdmin,editCluster)
        .delete(verifyJwt,isAdmin,deleteCluster)

router.route("/:id/hubs")
        .get(verifyJwt,isAdmin,getSocietiesByCluster)

export default router;

