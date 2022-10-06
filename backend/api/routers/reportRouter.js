import { Router } from "express";
import { authenticateUser } from "../../util/authMiddleware.js";
import {
  inputServiceImpl,
  calculationsServiceImpl,
  accountNoServiceImpl,
  reportServiceImpl,
} from "../../util/serviceImpl.js";
import { checkIfObjectIsNull } from "../../util/util.js";

const reportRouter = Router();

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

reportRouter.post("/createReport",authenticateUser , async (req, res, next) => {
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

/** Route for fetching reports that were created by user with specific ID

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

reportRouter.post("/getReports/:userId",authenticateUser, async (req, res, next) => {
  try {
    const user_id = req.params.userId;
    const reports = await reportServiceImpl.getReports(user_id);
    res.send({
      response: reports,
    });
  } catch (error) {
    next(error);
  }
});

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
reportRouter.post("/getReport/:reportId", authenticateUser , async (req, res, next) => {
  try {
    const report_id = req.params.reportId;
    const report = await reportServiceImpl.getReport(report_id);
    const input = await inputServiceImpl.getInput(report.input_id);
    const calculation = await calculationsServiceImpl.getCalculation(
      report.calculation_id
    );
    const accNumbers = await accountNoServiceImpl.getAccountNumbers(
      report.acc_numbers_id
    );
    res.send({ response: { input, calculation, accNumbers } });
  } catch (error) {
    next(error);
  }
});

export default reportRouter;
