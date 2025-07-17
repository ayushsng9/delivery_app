import {DataTypes,Model } from 'sequelize';
import { sequelize } from '../config/config.js';

class UserAuth extends Model {}

UserAuth.init(
    {
        name:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        password:{  
            type: DataTypes.STRING,
            allowNull: false
        },
        mobileNo:{
            type: DataTypes.STRING,
            allowNull : false,
            unique:true
        },
        userType: {
            type: DataTypes.ENUM('admin', 'agent', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
        customerId:{
            type: DataTypes.STRING,
            unique:true
        },
        isActive:
        {
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        sequelize,
        modelName: 'UserAuth',
        tableName: 'user_auth',
        underscored: true,
        paranoid: true,
    }
)

UserAuth.beforeSave(async(user) => {
    if(user.changed('password')){
        user.password = await bcrypt.hash(user.password,10);
    }
})

export {UserAuth}