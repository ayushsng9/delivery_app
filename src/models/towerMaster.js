import { DataTypes,Model } from 'sequelize';
import { sequelize } from '../config/config.js';

class TowerMaster extends Model {}

TowerMaster.init(
  {
    towerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    societyId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
  },
  {
    sequelize,
    modelName: 'TowerMaster',
    tableName: 'tower_master',
    underscored: true,
    paranoid: true,
  },
);

export default TowerMaster