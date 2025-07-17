import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {CityMaster,HubMaster,ClusterMaster} from "../models/index.js"

const addHub = asyncHandler(async (req, res) => {
  const { hubName, hubCode, cityId, isActive = true } = req.body;

  if (!hubName || !hubCode || !cityId) {
    throw new ApiError(400, "hubName, hubCode and cityId are required");
  }

  const city = await CityMaster.findByPk(cityId);
  if (!city) {
    throw new ApiError(404, "City not found");
  }

  const existingHub = await HubMaster.findOne({ where: { hubCode } });
  if (existingHub) {
    throw new ApiError(409, "Hub with this code already exists");
  }

  const newHub = await HubMaster.create({ hubName, hubCode, cityId, isActive });

  return res.status(201).json(new ApiResponse(200, newHub, "Hub added successfully"));
});

const editHub = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { hubName, hubCode, cityId, isActive } = req.body;

  const hub = await HubMaster.findByPk(id);
  if (!hub) {
    throw new ApiError(404, "Hub not found");
  }

  hub.hubName = hubName ?? hub.hubName;
  hub.hubCode = hubCode ?? hub.hubCode;
  hub.cityId = cityId ?? hub.cityId;
  hub.isActive = typeof isActive === 'boolean' ? isActive : hub.isActive;

  await hub.save();

  return res.status(200).json(new ApiResponse(200, hub, "Hub updated successfully"));
});

const deleteHub = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const hub = await HubMaster.findByPk(id);
  if (!hub) {
    throw new ApiError(404, "Hub not found");
  }

  await hub.destroy();
  return res.status(200).json(new ApiResponse(200, null, "Hub deleted successfully"));
});

const getHub = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const hub = await HubMaster.findByPk(id);

  if (!hub) {
    throw new ApiError(404, "Hub not found");
  }

  return res.status(200).json(new ApiResponse(200, hub, "Hub fetched successfully"));
});

const getClustersByHub = asyncHandler(async(req,res)=>{
    const {id} = req.params();
    const hub = HubMaster.findByPk(id,
        {
            include:[
                {
                    model : ClusterMaster,
                    as : "clusters",
                    required : false
                }   
            ]
        });
    
    if(!hub){
        throw new ApiError(404,"hub not found");
    }

    return res.status(200).json({
    success: true,
    message: "Clusters fetched successfully",
    clusters: hub.clusters
  });

});

export {addHub,editHub,deleteHub,getHub,getClustersByHub}