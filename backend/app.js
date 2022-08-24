import express from "express";
import db from './database/db_connection.js'
import inputs_repo from './database/db_call_testing.js'
import cors from 'cors'
import inputsRepo from "./repositories/inputsRepo.js";
import inputsService from './services/inputsService.js'

const app = express();
app.use(express.json())
app.use(cors())
const inputsRepoImpl = new inputsRepo(db)
const inputServiceImpl = new inputsService(inputsRepoImpl)

app.post('/createInput',async (req,res) => {
    const inputObject = req.body;
    console.log(inputObject)
    const rows = await inputServiceImpl.createInput(inputObject)
//    const rows = await inputsRepository.createInput(inputObject)
//    const {rows} = await db.query('SELECT inputs_year FROM inputs');
    res.send({response: rows});
})

// app.post('/',async (req,res) => {
//     const rows = await inputsRepo.getTestData()
//    const {rows} = await db.query('SELECT inputs_year FROM inputs');
//     res.send({response: rows});
// })

app.listen(4000, () =>{
    console.log('Server is running on: ', 4000)
})