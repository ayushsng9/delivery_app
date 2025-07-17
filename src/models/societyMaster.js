import { DataTypes,Model } from 'sequelize';
import { sequelize } from '../config/config.js';


class SocietyMaster extends Model {}

SocietyMaster.init(
  {
    societyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    societyCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pinCode:{
        type: DataTypes.STRING,
        allowNull: false
    },
    clusterId:{
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
    modelName: 'SocietyMaster',
    tableName: 'society_master',
    underscored: true,
    paranoid: true,
  },
);

export default SocietyMaster