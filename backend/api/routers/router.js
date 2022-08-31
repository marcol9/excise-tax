import { Router } from "express";
import db from '../../database/db_connection.js'
 import inputsRepo from "../../repositories/inputsRepo.js";
import inputsService from '../../services/inputsService.js'
 import taxDataRepo from "../../repositories/taxDataRepo.js";
 import taxDataService from "../../services/taxDataService.js";
 import calculationsRepo from "../../repositories/calculationsRepo.js";
 import calculationsService from '../../services/calculationsService.js'
 import accountNoRepo from "../../repositories/accountNoRepo.js";
 import accountNoService from "../../services/accountNoService.js";
 import reportRepo from '../../repositories/reportRepo.js'
 import reportService from '../../services/reportService.js'

const router = Router();

const inputsRepoImpl = new inputsRepo(db)
const inputServiceImpl = new inputsService(inputsRepoImpl)
const taxDataRepoImpl = new taxDataRepo(db);
const taxDataServiceImpl = new taxDataService(taxDataRepoImpl)
const calculationsRepoImpl = new calculationsRepo(db)
const calculationsServiceImpl = new calculationsService(calculationsRepoImpl,taxDataServiceImpl)
const accountNoRepoImpl = new accountNoRepo(db);
const accountNoServiceImpl = new accountNoService(accountNoRepoImpl);
const reportRepoImpl = new reportRepo(db);
const reportServiceImpl = new reportService(reportRepoImpl);

router.post('/createInput',async (req,res) => {
    //const taxData = await taxDataServiceImpl.getTaxData('2022')
    const inputObject = req.body;
    const rows = await inputServiceImpl.createInput(inputObject)
//    const rows = await inputsRepository.createInput(inputObject)
//    const {rows} = await db.query('SELECT inputs_year FROM inputs');
    res.send({response: rows});
})
router.post('/createReport',async (req,res) => {
    //const taxData = await taxDataServiceImpl.getTaxData('2022')
    const inputsObj = req.body.inputsObj;
    const calculationsObj = req.body.calculationsObj;
    const accNumbersObj = req.body.accNumbersObj;
    const {input_id} = await inputServiceImpl.createInput(inputsObj)
    const {calculation_id} = await calculationsServiceImpl.createCalculations(calculationsObj);
    const {acc_numbers_id} = await accountNoServiceImpl.createAccountNumbers(accNumbersObj);
    const {report_id} = await reportServiceImpl.createReport(1,calculation_id,input_id,acc_numbers_id);
//    const rows = await inputsRepository.createInput(inputObject)
//    const {rows} = await db.query('SELECT inputs_year FROM inputs');
    res.send({response: {input_id, calculation_id, acc_numbers_id, report_id}});
})

router.post('/calculate', async (req,res) =>{
    const inputObject = req.body;
    const calculations = await calculationsServiceImpl.calculate(inputObject);
      
    console.log(calculations)
    setTimeout(()=>{
        res.send({response:calculations})

    },3000)  
})


router.post('/getConsumptionPeriodes', async (req,res)=>{
    const consumptionPeriodes = await taxDataServiceImpl.getConsumptionPeriodes();
    console.log(consumptionPeriodes);
    console.log(1)
    
    setTimeout(()=>{
        res.send({response: consumptionPeriodes})

    },3000)  
})

export default router