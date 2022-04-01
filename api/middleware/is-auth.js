const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (!authorization) {
    const error = new Error("Not Authenticated");
    error.status = 402;
    throw error;
  }
  const token = authorization.split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.JSON_WebTokenSecretKey);
  } catch (err) {
    err.status = 500;
    err.message = "Server Error";
    err.data = [{ msg: "Decoding Token Failed" }];
    throw err;
  }
  req.id = decodeToken.id;
  next();
};
