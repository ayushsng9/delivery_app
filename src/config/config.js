import { Sequelize } from 'sequelize';
import dotenv from "dotenv"
dotenv.config({ path: './.env' })



const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});

const dbConnection = async() =>{ // connect sequelize to database
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }   
}

export {dbConnection,sequelize}; 