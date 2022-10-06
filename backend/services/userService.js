import Api401Error from "../errorHandling/api401Error.js";
import Api500Error from "../errorHandling/api500Error.js";
import { logError } from "../errorHandling/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async getJWT(user) {
    //to do: add validity check

    const foundUser = await this.userRepo.getUser(user.email);
    const same = await bcrypt.compare(user.password, foundUser.password);
    delete foundUser.password
    if (same) {
      const acessToken = jwt.sign(foundUser, process.env.ACESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      return acessToken;
    } else {
      throw new Api401Error("Wrong password");
    }
  }

  getUserFromJWT(cookie){
    if(cookie == null){
        throw new Api401Error('Jwt cookie is missing')
    }
    const claims = jwt.verify(cookie, process.env.ACESS_TOKEN_SECRET, (err,user)  =>{
        if (err) throw new Api401Error('Jwt not verified');
        return user;
    });
    if (!claims) {
      throw new Api401Error('Jwt not verified')
    }
    return claims;
  }
}
export default userService;
