var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'user_blank',
  password        : '111111',
  database        : 'db_blank'
});
module.exports = pool;
