const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    // await pool.query("DROP TABLE users");
    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users (user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), first_name VARCHAR ( 50 ) NOT NULL, last_name VARCHAR ( 50 ) NOT NULL, email VARCHAR ( 255 ) UNIQUE NOT NULL, password VARCHAR ( 250 ) NOT NULL, created_on TIMESTAMP, last_login TIMESTAMP)"
    );
    const { first_name, last_name, email, password } = req.body;
    const getUsers = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (getUsers.rows.length !== 0) {
      res.status(401).send("User Already Exists");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // res.json(getUsers.rows);
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, bcryptPassword]
    );
    // res.json(newUser.rows[0]);

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Email or Password Incorrect");
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).json("Email or Password Incorrect");
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Wrong");
  }
});

router.get("/verified", authorization, async (req, res) => {
  try {
    res.status(200).json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Wrong");
  }
});

module.exports = router;
