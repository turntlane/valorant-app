const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "../.env",
});
// require("dotenv").config();

const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
};

module.exports = jwtGenerator;
