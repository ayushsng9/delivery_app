import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {ClusterMaster,SocietyMaster,TowerMaster} from "../models/index.js"

const addSociety = asyncHandler(async (req, res) => {
  const { societyName, societyCode, pinCode, clusterId, isActive = true } = req.body;

  if (!societyName || !societyCode || !pinCode || !clusterId) {
    throw new ApiError(400, "societyName, societyCode, pinCode, and clusterId are required");
  }

  const cluster = await ClusterMaster.findByPk(clusterId);
  if (!cluster) {
    throw new ApiError(404, "Cluster not found");
  }

  const existingSociety = await SocietyMaster.findOne({ where: { societyCode } });
  if (existingSociety) {
    throw new ApiError(409, "Society with this code already exists");
  }

  const newSociety = await SocietyMaster.create({ societyName, societyCode, pinCode, clusterId, isActive });

  return res.status(201).json(new ApiResponse(200, newSociety, "Society added successfully"));
});


const editSociety = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { societyName, societyCode, pinCode, clusterId, isActive } = req.body;

  const society = await SocietyMaster.findByPk(id);
  if (!society) {
    throw new ApiError(404, "Society not found");
  }

  society.societyName = societyName ?? society.societyName;
  society.societyCode = societyCode ?? society.societyCode;
  society.pinCode = pinCode ?? society.pinCode;
  society.clusterId = clusterId ?? society.clusterId;
  society.isActive = typeof isActive === "boolean" ? isActive : society.isActive;

  await society.save();

  return res.status(200).json(new ApiResponse(200, society, "Society updated successfully"));
});

const deleteSociety = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const society = await SocietyMaster.findByPk(id);
  if (!society) {
    throw new ApiError(404, "Society not found");
  }

  await society.destroy();
  return res.status(200).json(new ApiResponse(200, null, "Society deleted successfully"));
});


const getSociety= asyncHandler(async (req, res) => {
  const { id } = req.params;
  const society = await SocietyMaster.findByPk(id);

  if (!society) {
    throw new ApiError(404, "Society not found");
  }

  return res.status(200).json(new ApiResponse(200, society, "Society fetched successfully"));
});


const getTowersBySociety = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const society = await SocietyMaster.findByPk(id, {
    include: [
      {
        model: TowerMaster,
        as: "towers",
        where: { isActive: true },
        required: false
      }
    ]
  });

  if (!society) {
    throw new ApiError(404, "Society not found");
  }

  return res.status(200).json({
    success: true,
    message: "Towers fetched successfully",
    toers: society.towers
  });
});


export {addSociety,editSociety,deleteSociety,getSociety,getTowersBySociety};
