const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get the token from the header
  const token = req.header("x-auth-token");

  // check for the token
  if (!token) {
    return res.status(401).json({message: "No token, authorization denied."});
  }

  // verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({message: "Token is not valid"});
  }
};
