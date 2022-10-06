import { Router } from "express";
import { checkIfObjectIsNull } from "../../util/util.js";
import { prerequisitesServiceImpl } from "../../util/serviceImpl.js";
import { authenticateAdmin, authenticateUser } from "../../util/authMiddleware.js";

const prerequisitesRouter = Router();


prerequisitesRouter.post("/createPrerequisites",authenticateAdmin, async (req, res, next) => {
  try {
    const inputArray = checkIfObjectIsNull(req.body);
    const response = await prerequisitesServiceImpl.createPrerequisites(inputArray);
    
    res.send({ response: response });
  } catch (error) {
    next(error);
  }
});

prerequisitesRouter.post('/getPrerequisites',authenticateUser , async (req,res,next) =>{
    try{
        const response = await prerequisitesServiceImpl.getPrerequisites();
        res.send({response: response})
    }catch(error){
        next(error);
    }
} )

export default prerequisitesRouter;