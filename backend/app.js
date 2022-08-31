import express from "express";
import cors from 'cors'
import router from './api/routers/router.js'


const app = express();
app.use(express.json())
app.use(cors())
app.use(router)


// app.post('/',async (req,res) => {
//     const rows = await inputsRepo.getTestData()
//    const {rows} = await db.query('SELECT inputs_year FROM inputs');
//     res.send({response: rows});
// })

app.listen(4000, () =>{
    console.log('Server is running on: ', 4000)
})