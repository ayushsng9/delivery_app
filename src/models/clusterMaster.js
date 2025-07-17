import {DataTypes,Model } from 'sequelize';
import { sequelize } from '../config/config.js';


class ClusterMaster extends Model {}

ClusterMaster.init(
  {
    clusterName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clusterCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hubId:{
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
    modelName: 'ClusterMaster',
    tableName: 'cluster_master',
    underscored: true,
    paranoid: true,
  },
);

export default ClusterMaster