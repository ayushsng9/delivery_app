import {DataTypes,Model } from 'sequelize';
import { sequelize } from '../config/config.js';

class CityMaster extends Model {}

CityMaster.init(
  {
    // Model attributes are defined here
    cityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sequence:{
      type: DataTypes.INTEGER,
    },
    isActive:{
      type: DataTypes.BOOLEAN,
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'CityMaster', // We need to choose the model name
    tableName: 'city_master',
    underscored: true,
    paranoid: true,
  },
);

export {CityMaster}

/*
Purpose
underscored ----->	Converts camelCase to snake_case (field names like created_at)
paranoid ---->	Enables soft-deletes (deleted_at is used instead of removing records
and deleted record can be restored)
createdAt/updatedAt/deletedAt ---->	Customize timestamp field names
 */


