const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "../.env",
});

module.exports = async (req, res, next) => {
  const jwtToken = req.header("token");

  console.log("jwt token", jwtToken);

  if (!jwtToken) {
    return res.status(403).json("Not Authorized");
  }
  try {
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    console.log("payload: ", payload);

    req.user = payload.user;

    console.log(req.user);
    next();
  } catch (err) {
    console.log("brother");
    console.log(err.message);
    return res.status(403).json("no sir");
  }
};
