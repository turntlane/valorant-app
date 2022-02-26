const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

app.use(cors())
app.use(express.json())


app.post('/playerinfo', async (req, res) => {
    try {
        const {player_name, player_mouse, player_sensitivity} = req.body;
        const newPlayer = await pool.query("INSERT INTO player_info ( player_name, player_mouse, player_sensitivity) VALUES($1, $2, $3) RETURNING *", [player_name, player_mouse, player_sensitivity])
        res.json(newPlayer.rows[0])
    }
    catch(err) {
        console.error(err.message)
    }
})


app.get('/playerinfo', async (req, res) => {
    try {
        const allPlayers = await pool.query("SELECT * FROM player_info");
        res.json(allPlayers.rows)
    }
    catch (err) {
        console.error(err.message)
    }
})

app.get('/players', async (req, res) => {
    try {
        const {name} = req.query;
        const allPlayers = await pool.query("SELECT * FROM player_info WHERE player_name || ' ' || player_mouse ILIKE $1", [`%${name}%`]);
        res.json(allPlayers.rows)
    }
    catch (err) {
        console.error(err.message)
    }
})




app.listen(5000, () => {
    console.log('Server is up on 5000')
})