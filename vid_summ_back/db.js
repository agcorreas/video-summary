const {Pool} = require('pg');

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"vidsumm_users",
    password:"hola",
    port:5432,
});

module.exports = pool;