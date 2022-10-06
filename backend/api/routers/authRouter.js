import Router from "express";
import { authenticateUser } from "../../util/authMiddleware.js";
import { userServiceImpl } from "../../util/serviceImpl.js";

const authRouter = Router();

//session requires express-session package
authRouter.post("/login", async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const acessToken = await userServiceImpl.getJWT(user);
    res.cookie("jwt", acessToken, {
      maxAge: 24 * 60 * 60 * 1000, //1 day,
    });
    res.send({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/getUser",authenticateUser, async (req, res,next) => {
  try {
    const cookie = req.cookies["jwt"];
    const user = userServiceImpl.getUserFromJWT(cookie);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "Success",
  });
});

export default authRouter;
