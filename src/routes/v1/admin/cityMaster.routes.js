import { Router } from "express";
import { addCity,editCity,deleteCity,getHubsByCity, getCity} from "../../../controllers/cityMaster.controller.js";
import { isAdmin, verifyJwt } from "../../../middleware/auth.js";

const router = Router();

router.route("/")   // https://localhost:3000/api/v1/city
        .post(verifyJwt,isAdmin,addCity)           

router.route("/:id")
        .get(verifyJwt,isAdmin,getCity)
        .put(verifyJwt,isAdmin,editCity)
        .delete(verifyJwt,isAdmin,deleteCity)

router.route("/:id/hubs")
        .get(verifyJwt,isAdmin,getHubsByCity)


export default router