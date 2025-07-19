import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/config.js';

class UserMaster extends Model {}

UserMaster.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mobileNo: {
      type: DataTypes.STRING, // Phone numbers should always be string
      allowNull: false,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userType: {
      type: DataTypes.ENUM('user', 'agent'),
      llowNull: false,
      defaultValue: 'user', // default role for OTP login
    },
  },
  {
    sequelize,
    modelName: 'user_master',
        tableName: 'user_master',
        underscored: true,
        paranoid: true,
  },
);

export default UserMaster;
