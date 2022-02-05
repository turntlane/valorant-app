const Pool = require('pg').Pool
const dotenv = require('dotenv')
dotenv.config({
    path: '../.env'
})

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'valorant-tracker'
})

module.exports = pool