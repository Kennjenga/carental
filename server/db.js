require("dotenv").config({ path: ".env.local" });
const mysql2 = require("mysql2");

const db = mysql2.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = db;
