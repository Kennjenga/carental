const mysql2 = require("mysql2");

const db = mysql2.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: 19064,
  database: "carental",
});

module.exports = db;
