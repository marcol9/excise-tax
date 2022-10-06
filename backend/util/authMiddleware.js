import jwt from "jsonwebtoken";
import Api401Error from "../errorHandling/api401Error.js";
import Api403Error from "../errorHandling/api403Error.js";

function authenticateUser(req, res, next) {
  const token = req.cookies["jwt"];
  if (token == null) throw new Api401Error("Missing jwt token");
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
    if (err) throw new Api401Error("Jwt not verified");
    req.user = user;
    next();
  });
}
function authenticateAdmin(req, res, next) {
  const token = req.cookies["jwt"];
  if (token == null) throw new Api401Error("Missing jwt token");
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
    if (err) throw new Api401Error("Jwt not verified");
    if (user.role != "admin") {
      throw new Api403Error(
        "Forbidden: You do not have access to this request"
      );
    }
    next();
  });
}

export { authenticateUser, authenticateAdmin };
