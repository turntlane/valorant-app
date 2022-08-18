const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "../.env",
});

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    // console.log(jwtToken);

    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    // console.log(payload);

    req.user = payload.user;

    console.log(req.user);
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(403).json("Not Authorized");
  }
};
