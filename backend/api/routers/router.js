import { Router } from "express";
import {
  inputServiceImpl,
  taxDataServiceImpl,
  calculationsServiceImpl,
  accountNoServiceImpl,
  reportServiceImpl,
} from "../../util/serviceImpl.js";
import { checkIfObjectIsNull } from "../../util/util.js";

const router = Router();



/** Route for creating report. Returns ID's of created record.

  Request body example (All fields are required):

  {
    "calculationsObj": {
        "taxes_total_el": 2.7,
        "not_reimb_tax": 0.01,
        "vat_el": 0.6,
        "el_and_vat": 3.3,
        "taxes_water_total": 22.93,
        "vat_water": 0.6,
        "water_and_vat": 23.53,
        "reimb_el_tax": 0.08,
        "reimb_water_tax": 0.69,
        "deduct_el_tax": 0.02,
        "deduct_water_tax": 0.02,
        "reimb_tax_and_vat": 0.81,
        "taxes_and_vat_total": 26.83
    },
    "inputsObj": {
        "company_name": "name",
        "consumption_periode": "2022",
        "el_invoice_amount": 3,
        "period_consumption_kwh": 3,
        "calculated_chw": 3,
        "water_invoice_amount": 3,
        "period_consumption_m3": 3.6,
        "vat_percentage": 3
    },
    "accNumbersObj": {
        "debited_el_cons": 3,
        "credited_el_cons_supplier": 3,
        "debited_el_tax": 3,
        "credited_el_cons": 3,
        "debited_water_cons": 3,
        "credited_water_cons_supplier": 3,
        "debited_water_tax": 3,
        "credited_water_cons": 3,
        "debited_automatically": 3,
        "vat_credited_el": 3,
        "vat_credited_water": 3
    }
  }

  Response body example:
  {
    "response": {
        "input_id": "167",
        "calculation_id": "126",
        "acc_numbers_id": "120",
        "report_id": "101"
    }
  }

  Response codes:
    200 - OK.
    404 - Consumption periode not found
    400 - Bad request. Incorrect body/field.
 *    
 */

router.post("/createReport", async (req, res, next) => {
  try {
    const inputsObj = checkIfObjectIsNull(req.body.inputsObj);
    const calculationsObj = checkIfObjectIsNull(req.body.calculationsObj);
    const accNumbersObj = checkIfObjectIsNull(req.body.accNumbersObj);

    const { input_id } = await inputServiceImpl.createInput(inputsObj);
    const { calculation_id } = await calculationsServiceImpl.createCalculations(
      calculationsObj
    );
    const { acc_numbers_id } = await accountNoServiceImpl.createAccountNumbers(
      accNumbersObj
    );
    const { report_id } = await reportServiceImpl.createReport(
      1,
      calculation_id,
      input_id,
      acc_numbers_id
    );

    res.send({
      response: { input_id, calculation_id, acc_numbers_id, report_id },
    });
  } catch (error) {
    next(error);
  }
});

/** Route Description
  Route for fetching reports that were created by user with specific ID

  Request parameter: userId (Int, required)

  Response body example: 

  {
    "response": [
        {
            "report_id": "37",
            "report_date": "2022-09-06",
            "company_name": "marco co"
        },
        {
            "report_id": "38",
            "report_date": "06/09/2022",
            "company_name": "marco ko"
        }
    ]
  }

  Response codes: 
  200 - OK
  400 - Invalid user_id
 */

router.post('/getReports/:userId', async (req,res,next) => {
    try{
        const user_id = req.params.userId
        const reports = await reportServiceImpl.getReports(user_id);
        res.send({
            response: reports
        })
    }catch(error){
        next(error)
    }
})


/** Returns report with provided ID
 
  Request parameter: reportId (Int,required)

  Response body example:

  {
    "response": {
        "input": {
            "input_id": "93",
            "consumption_periode": "2022",
            "el_invoice_amount": "3.00",
            "period_consumption_kwh": "3.00",
            "calculated_chw": "3.00",
            "water_invoice_amount": "3.00",
            "period_consumption_m3": "3.00",
            "vat_percentage": "3.00",
            "company_name": "ff"
        },
        "calculation": {
            "calculation_id": "64",
            "taxes_total_el": "2.71",
            "not_reimb_tax": "0.01",
            "vat_el": "0.60",
            "el_and_vat": "3.31",
            "taxes_water_total": "19.11",
            "vat_water": "0.60",
            "water_and_vat": "19.71",
            "taxes_and_vat_total": "23.02",
            "reimb_el_tax": "0.08",
            "reimb_water_tax": "0.57",
            "deduct_el_tax": "0.02",
            "deduct_water_tax": "0.02",
            "reimb_tax_and_vat": "0.69"
        },
        "accNumbers": {
            "acc_numbers_id": "63",
            "debited_el_cons": "12",
            "credited_el_cons_supplier": "212",
            "debited_el_tax": "212",
            "credited_el_cons": "2",
            "debited_water_cons": "2",
            "credited_water_cons_supplier": "12",
            "debited_water_tax": "12",
            "credited_water_cons": "21",
            "debited_automatically": "2",
            "vat_credited_el": "2",
            "vat_credited_water": "2"
        }
    }
  }

  Response codes:
  200 - OK
  400 - Invalid reportId
  404 - Could not find report with provided ID
*/
router.post('/getReport/:reportId', async (req,res,next) => {
    try{
    const report_id = req.params.reportId;
    const report = await reportServiceImpl.getReport(report_id)
    const input = await inputServiceImpl.getInput(report.input_id);
    const calculation = await calculationsServiceImpl.getCalculation(report.calculation_id)
    const accNumbers = await accountNoServiceImpl.getAccountNumbers(report.acc_numbers_id)
    res.send({response: {input, calculation, accNumbers}})
    }catch(error){
        next(error)
    }
})

/** Returns calculations from provided inputs. Does not save
    calculations to DB.
  
  Request body example (All required): 

  {
    "consumption_periode": 2022,
    "el_invoice_amount": 22,
    "period_consumption_kwh": 100,
    "calculated_chw": 3,
    "company_name":"dsds",
    "water_invoice_amount": 2500,
    "period_consumption_m3": 255,
    "vat_percentage": 25
  }

  Response body example:

  {
    "response": {
        "taxes_total_el": 90.3,
        "not_reimb_tax": 0.4,
        "vat_el": 4.4,
        "el_and_vat": 94.7,
        "taxes_water_total": 1624.35,
        "vat_water": 500,
        "water_and_vat": 2124.35,
        "reimb_el_tax": 22.48,
        "reimb_water_tax": 406.09,
        "deduct_el_tax": 1.1,
        "deduct_water_tax": 125,
        "reimb_tax_and_vat": 554.67,
        "taxes_and_vat_total": 2219.05
    }
  }


  Response codes:
  200 - OK
  400 - Bad request. Incorrect body/field.

 */
router.post("/calculate", async (req, res, next) => {
  try {
    const inputObject = checkIfObjectIsNull(req.body);
    const calculations = await calculationsServiceImpl.calculate(inputObject);
    res.send({ response: calculations });
  } catch (error) {
    next(error);
  }
});

/** Returns existing consumptiion periodes
  
  Response body example:

  {
    "response": [
        {
            "consumption_periode": "2021"
        },
        {
            "consumption_periode": "2022"
        },
        {
            "consumption_periode": "2023"
        }
    ]
  }

  Response codes: 
  200 - OK
  404 - No consumption periode found.

 */
router.post("/getConsumptionPeriodes", async (req, res, next) => {
  try {
    const consumptionPeriodes =
      await taxDataServiceImpl.getConsumptionPeriodes();
    res.send({ response: consumptionPeriodes });
  } catch (error) {
    next(error);
  }
});

/** Deletes tax data record with provided ID
 
  Parameter: taxDataId (Int, required)

  Response body example:

  {"response":"Tax data record with id 40 has been deleted successfully"}

  Response codes:
  200 - OK
  400 - Invalid taxDataId
  404 - Tax data record not found
 */
router.post('/deleteTaxData/:taxDataId', async (req,res,next) => {
    try{
        const tax_data_id = req.params.taxDataId;
        const response = await taxDataServiceImpl.deleteTaxData(tax_data_id);
        res.send({response: response})
    }catch(error){
        next(error)
    }
})

/** Creates new tax data
  
  Request body example: 

  {
    "energy_tax": "5",
    "reduction": "0.40",
    "compensation_chw": "89.60",
    "water_charges": "6.37",
    "consumption_periode": "2023"
  }

  Response body example:

  {
    "response": "Tax data record with id 43 has been created successfully"
  }

  Response codes:
  200 - OK
  400 - Invalid body/field/consumption_periode
 */
router.post('/addTaxData', async (req,res,next) => {
    try{
        const taxDataObj = checkIfObjectIsNull(req.body);
        const tax_data_id = await taxDataServiceImpl.createTaxData(taxDataObj)
        res.send({
            response: tax_data_id
        })
    }catch(error){
        next(error)
    }
})

/** Updates tax data with provided ID
 
    Request parameter: taxDataId (Int, required)

    Request body example: 

    {
      "energy_tax": "90.00",
      "reduction": "11",
      "compensation_chw": "89.60",
      "water_charges": "6.37",
      "consumption_periode": "2021 ( den 1. februa)"
    }

    Response body:

    {"response":"Tax data record with id 39 has been updated successfully"}

    Response codes:
    200 - OK
    400 - Invalid body/field/taxDataId/consumption_periode
    404 - Tax data not found
 */
router.post('/updateTaxData/:taxDataId', async (req,res,next) =>{
    try{
        const taxDataObj = checkIfObjectIsNull(req.body);
        const tax_data_id = req.params.taxDataId;
        const response = await taxDataServiceImpl.updateTaxData(taxDataObj, tax_data_id);
        res.send({response: response})
    }catch(error){
        next(error)
    }
})


/** Returns all existing tax data records
  
    Response body:

    {
    "response": [
        {
            "tax_data_id": "38",
            "energy_tax": "90.30",
            "reduction": "0.40",
            "compensation_chw": "89.90",
            "water_charges": "6.37",
            "consumption_periode": "2022"
        },
        {
            "tax_data_id": "39",
            "energy_tax": "3.00",
            "reduction": "3.00",
            "compensation_chw": "22.00",
            "water_charges": "3.00",
            "consumption_periode": "2021"
        }
      ]
    }

 */
router.post('/getTaxData', async (res,next) =>{
    try{
        const response = await taxDataServiceImpl.getAllTaxData();
        res.send({response: response})
    }catch(error){
        next(error)
    }
})

export default router;
