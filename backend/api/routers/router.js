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

router.post("/calculate", async (req, res, next) => {
  try {
    const inputObject = checkIfObjectIsNull(req.body);

    const calculations = await calculationsServiceImpl.calculate(inputObject);
    console.log(calculations);
    res.send({ response: calculations });
  } catch (error) {
    next(error);
  }
});

router.post("/getConsumptionPeriodes", async (req, res, next) => {
  try {
    const consumptionPeriodes =
      await taxDataServiceImpl.getConsumptionPeriodes();
    res.send({ response: consumptionPeriodes });
  } catch (error) {
    next(error);
  }
});

export default router;
