import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {ClusterMaster,HubMaster,SocietyMaster} from "../models/index.js"

const addCluster = asyncHandler(async (req, res) => {
  const { clusterName, clusterCode, hubId, isActive = true } = req.body;

  if (!clusterName || !clusterCode || !hubId) {
    throw new ApiError(400, "clusterName, clusterCode, and hubId are required");
  }

  const hub = await HubMaster.findByPk(hubId);
  if (!hub) {
    throw new ApiError(404, "Hub not found");
  }

  const existingCluster = await ClusterMaster.findOne({ where: { clusterCode } });
  if (existingCluster) {
    throw new ApiError(409, "Cluster with this code already exists");
  }

  const newCluster = await ClusterMaster.create({ clusterName, clusterCode, hubId, isActive });

  return res.status(201).json(new ApiResponse(200, newCluster, "Cluster added successfully"));
});

const editCluster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { clusterName, clusterCode, hubId, isActive } = req.body;

  const cluster = await ClusterMaster.findByPk(id);
  if (!cluster) {
    throw new ApiError(404, "Cluster not found");
  }

  cluster.clusterName = clusterName ?? cluster.clusterName;
  cluster.clusterCode = clusterCode ?? cluster.clusterCode;
  cluster.hubId = hubId ?? cluster.hubId;
  cluster.isActive = typeof isActive === 'boolean' ? isActive : cluster.isActive;

  await cluster.save();

  return res.status(200).json(new ApiResponse(200, cluster, "Cluster updated successfully"));
});

const deleteCluster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cluster = await ClusterMaster.findByPk(id);
  if (!cluster) {
    throw new ApiError(404, "Cluster not found");
  }

  await cluster.destroy(); // soft delete
  return res.status(200).json(new ApiResponse(200, null, "Cluster deleted successfully"));
});

const getCluster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cluster = await ClusterMaster.findByPk(id);

  if (!cluster) {
    throw new ApiError(404, "Cluster not found");
  }

  return res.status(200).json(new ApiResponse(200,cluster, "Cluster fetched successfully"));
});

const getSocietiesByCluster = asyncHandler(async(req,res)=>{

    const {id} = req.params();
    const cluster = ClusterMaster.findByPk(id,
        {
            include:[
                {
                    model : SocietyMaster,
                    as : "societies",
                    required : false
                }   
            ]
        });
    
    if(!cluster){
        throw new ApiError(404,"cluster not found");
    }

    return res.status(200).json({
    success: true,
    message: "Societies fetched successfully",
    clusters: cluster.societies
  });
})


export {addCluster,editCluster,deleteCluster,getCluster,getSocietiesByCluster};
