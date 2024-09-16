require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyUser = (req, resp, next) => {
  const token = req.cookies["access_token"];
  //
  if (!token) {
    next(new Error("no token found | need login to access this page"));
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRETE, (err, authData) => {
      if (err) {
        next(new Error("invalid token"));
      }
      if (authData) {
        req.user = authData;
        next();
      }
    });
  }
};

module.exports = verifyUser;
