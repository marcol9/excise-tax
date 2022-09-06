import express from "express";
import cors from 'cors'
import router from './api/routers/router.js'
import {logError, returnError} from './errorHandling/errorHandler.js'

const app = express();
app.use(express.json())
app.use(cors())
app.use(router)
app.use(logError)
app.use(returnError)


app.listen(4000, () =>{
    console.log('Server is running on: ', 4000)
})