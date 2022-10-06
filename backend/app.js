import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";

import {logError, returnError} from './errorHandling/errorHandler.js'
import taxDataRouter from './api/routers/taxDataRouter.js';
import reportRouter from './api/routers/reportRouter.js';
import calculationsRouter from './api/routers/calculationsRouter.js';
import authRouter from './api/routers/authRouter.js';
import prerequisitesRouter from './api/routers/prerequisitesRouter.js';



const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:4000", "http://localhost:3000"],
    })
  );
app.use(taxDataRouter,reportRouter,calculationsRouter,authRouter, prerequisitesRouter)
app.use(logError)
app.use(returnError)


app.listen(process.env.PORT, () =>{
    console.log('Server is running on: ', process.env.PORT)
})

