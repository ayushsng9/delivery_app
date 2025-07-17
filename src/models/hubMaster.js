import { DataTypes,Model } from 'sequelize';
import { sequelize } from '../config/config.js';


class HubMaster extends Model {}

HubMaster.init(
  {
    hubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hubCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    isActive:{
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    modelName: 'HubMaster',
    tableName: 'hub_master',
    underscored: true,
    paranoid: true,
  },
);

export default HubMaster