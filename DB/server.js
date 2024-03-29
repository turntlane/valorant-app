const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/jwtAuth"));
app.use("/home", require("./routes/home"));

app.get("/playerinfo", async (req, res) => {
  try {
    const allPlayers = await pool.query("SELECT * FROM player_info");
    res.json(allPlayers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/players", async (req, res) => {
  try {
    const { name } = req.query;
    const allPlayers = await pool.query(
      "SELECT * FROM player_info WHERE player_name || ' ' || player_mouse ILIKE $1",
      [`%${name}%`]
    );
    res.json(allPlayers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/playerinfo", async (req, res) => {
  try {
    const { player_name, player_mouse, player_sensitivity } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO player_info ( player_name, player_mouse, player_sensitivity) VALUES($1, $2, $3) RETURNING *",
      [player_name, player_mouse, player_sensitivity]
    );
    if (newPlayer.rowCount === 1) {
      res.json(newPlayer.rows[0]);
      console.log(newPlayer.rowCount);
    } else {
      res.json("error");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// app.post("/register", async (req, res) => {
//   try {
//     // await pool.query("DROP TABLE users");
//     await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
//     await pool.query(
//       "CREATE TABLE IF NOT EXISTS users (user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), first_name VARCHAR ( 50 ) NOT NULL, last_name VARCHAR ( 50 ) NOT NULL, email VARCHAR ( 255 ) UNIQUE NOT NULL, password VARCHAR ( 50 ) NOT NULL, confirm_password VARCHAR ( 50 ) NOT NULL, created_on TIMESTAMP, last_login TIMESTAMP)"
//     );
//     const { first_name, last_name, email, password, confirm_password } =
//       req.body;
//     // const getUsers = await pool.query("SELECT * FROM users WHERE email = $1", [
//     //   email,
//     // ]);
//     // res.json(getUsers.rows);
//     const newUser = await pool.query(
//       "INSERT INTO users (first_name, last_name, email, password, confirm_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [first_name, last_name, email, password, confirm_password]
//     );
//     res.json(newUser.rows[0]);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// app.get("/register", async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Wrong");
//   }
// });

app.listen(5000, () => {
  console.log("Server is up on 5000");
});
