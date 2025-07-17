import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dbConnection } from "./config/config.js";
import syncModel from "./models/index.js";
import bcrypt from "bcrypt"
dotenv.config({path:'./.env'})

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser())


app.use(express.json({limit: "16kb"}))

// routing

import routes from "./routes/index.js"
app.use('/api',routes);



const startServer = async()=>{
    try {
        await dbConnection();
        await syncModel;
        app.listen(process.env.PORT,async()=>{
        console.log(`Listening on port : ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();

