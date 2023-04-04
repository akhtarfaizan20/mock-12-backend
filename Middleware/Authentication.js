require("dotenv").config();
var jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    res.status(400).send({ msg: "Authentication Failed" });
  } else {
    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
    req.body.userID = _id;
    next();
  }
};

module.exports = {
  authentication,
};
