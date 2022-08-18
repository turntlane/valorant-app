const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Wrong");
  }
});

module.exports = router;
