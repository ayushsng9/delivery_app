import { sequelize } from "../config/config.js";
import {CityMaster} from "./cityMaster.js";
import HubMaster from "./hubMaster.js";
import ClusterMaster from "./clusterMaster.js";
import SocietyMaster from "./societyMaster.js";
import TowerMaster from "./towerMaster.js";

const associate = () =>{

CityMaster.hasMany(HubMaster,{
    foreignKey: 'cityId',
    as: 'hubs'
});

HubMaster.belongsTo(CityMaster,{
    foreignKey:'cityId',
    as: 'city'
});

HubMaster.hasMany(ClusterMaster,{
    foreignKey: 'hubId',
    as: 'clusters'
});

ClusterMaster.belongsTo(HubMaster,{
    foreignKey:'hubId',
    as: 'hub'   
});

ClusterMaster.hasMany(SocietyMaster,{
    foreignKey: 'clusterId',
    as: 'societies'
});

SocietyMaster.belongsTo(ClusterMaster,{
    foreignKey:'clusterId',
    as: 'cluster'   
});

SocietyMaster.hasMany(TowerMaster,{
    foreignKey: 'societyId',
    as: 'towers'
});

TowerMaster.belongsTo(SocietyMaster,{
    foreignKey:'societyId',
    as: 'society'   
});

}

const syncModel = async() =>{
    associate();
    await sequelize.sync({alter:true});
}

export {
  sequelize,
  CityMaster,
  HubMaster,
  ClusterMaster,
  SocietyMaster,
  TowerMaster,
  associate,
};

export default syncModel();






