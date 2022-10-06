import { Router } from "express";
import { authenticateAdmin, authenticateUser } from "../../util/authMiddleware.js";
import { taxDataServiceImpl } from "../../util/serviceImpl.js";
import { checkIfObjectIsNull } from "../../util/util.js";

const taxDataRouter = Router();

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
taxDataRouter.post("/getConsumptionPeriodes",authenticateUser, async (req, res, next) => {
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
taxDataRouter.post("/deleteTaxData/:taxDataId",authenticateAdmin, async (req, res, next) => {
  try {
    const tax_data_id = req.params.taxDataId;
    const response = await taxDataServiceImpl.deleteTaxData(tax_data_id);
    res.send({ response: response });
  } catch (error) {
    next(error);
  }
});

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
taxDataRouter.post("/addTaxData",authenticateAdmin, async (req, res, next) => {
  try {
    const taxDataObj = checkIfObjectIsNull(req.body);
    const tax_data_id = await taxDataServiceImpl.createTaxData(taxDataObj);
    res.send({
      response: tax_data_id,
    });
  } catch (error) {
    next(error);
  }
});

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
taxDataRouter.post("/updateTaxData/:taxDataId", async (req, res, next) => {
  try {
    const taxDataObj = checkIfObjectIsNull(req.body);
    const tax_data_id = req.params.taxDataId;
    const response = await taxDataServiceImpl.updateTaxData(
      taxDataObj,
      tax_data_id
    );
    res.send({ response: response });
  } catch (error) {
    next(error);
  }
});

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
taxDataRouter.post("/getTaxData",authenticateAdmin, async (req, res, next) => {
  try {
    const response = await taxDataServiceImpl.getAllTaxData();
    res.send({ response: response });
  } catch (error) {
    next(error);
  }
});

export default taxDataRouter;
