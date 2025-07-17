import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {CityMaster,HubMaster} from "../models/index.js"
import { Op, where } from "sequelize"


const addCity = asyncHandler(async(req,res)=>{
    const {cityName,cityCode,sequence} = req.body;
    console.log(req.body);
    if (!cityName || !cityCode) {
        throw new ApiError(400,"City name and City code are required");
    }

    const existingCity = await CityMaster.findOne({
        where: {
            [Op.or]: [
                { cityCode },
                { cityName },
                { sequence }
            ]
        }
    });

    if (existingCity) {
        throw new ApiError(409, "City with same name, code, or sequence already exists");
    }

    const newCity = await CityMaster.create({
    cityName,
    cityCode,
    sequence,
    isActive:true
  });

  return res.status(201).json(
        new ApiResponse(200,newCity,"City added successfully")
    )

})

const editCity = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {cityName,cityCode,sequence,isActive} = req.body
    const city = await CityMaster.findByPk(id);

    if(!city)
    {
        throw new ApiError(404,"City not found");
    }

    city.cityName = cityName || city.cityName;
    city.cityCode = cityCode || city.cityCode;
    city.sequence = sequence ?? city.sequence;
    city.isActive = typeof isActive === 'boolean' ? isActive : city.isActive;

    await city.save();

    return res.status(200).json(
        new ApiResponse(200,city,"City updated successfully")
    );

})

const deleteCity = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const city = await CityMaster.findByPk(id);
    if(!city)
    {
        throw new ApiError(404,"City not found");
    }

    await city.destroy();

    return res.status(200).json(
        new ApiResponse(200,null,"City deleted succesfully")
    );
})

const getCity = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const city = await CityMaster.findByPk(id);
    if(!city)
    {
        throw new ApiError(404,"City not found");
    }

    return res.status(200).json(
        new ApiResponse(200,city,"City details fetched successfully")
    )
});

const getHubsByCity = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const city = await CityMaster.findByPk(id,
        {
            include:[
                {
                    model : HubMaster,
                    as : "hubs",
                    required : false
                }   
            ]
        });
    
    if(!city){
        throw new ApiError(404,"City not found");
    }

    return res.status(200).json({
    success: true,
    hubs: city.hubs,
    message: "Hubs fetched successfully",
  });

});


export {addCity,editCity,deleteCity,getCity,getHubsByCity}