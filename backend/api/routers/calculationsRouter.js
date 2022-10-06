import { Router } from "express";
import { authenticateUser } from "../../util/authMiddleware.js";
import { calculationsServiceImpl } from "../../util/serviceImpl.js";
import { checkIfObjectIsNull } from "../../util/util.js";

const calculationsRouter = Router();

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
calculationsRouter.post("/calculate",authenticateUser, async (req, res, next) => {
  try {
    const inputObject = checkIfObjectIsNull(req.body);
    const calculations = await calculationsServiceImpl.calculate(inputObject);
    res.send({ response: calculations });
  } catch (error) {
    next(error);
  }
});

export default calculationsRouter;
