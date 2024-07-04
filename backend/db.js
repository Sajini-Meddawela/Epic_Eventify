const mysql = require("mysql2/promise");

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "567Local:8032",
  database: "entertainmentdb",
});
console.log(`EpicEventify!`);

module.exports = connectionPool;
