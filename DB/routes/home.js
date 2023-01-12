const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    // res.status(200).json(req.user);
    const user = await pool.query(
      "SELECT first_name, last_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Wrong");
  }
});

module.exports = router;
