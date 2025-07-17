import { DataType,Model } from 'sequelize';
import { sequelize } from '../config/config';

class UserMaster extends Model {}

UserMaster.init(
  {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
    userId: {
        type: DataTypes.STRING,
    },
    mobileNo: {
        type: DataTypes.INTEGER,
    },
    emailId:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'UserMaster',
    underscored: true,
    paranoid: true,
  },
);

export default UserMaster