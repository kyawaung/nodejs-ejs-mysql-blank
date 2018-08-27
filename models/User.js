var db = require('../dbconn');
var bcrypt = require('bcrypt-nodejs');

var User = {
  add: function(params, callback){
    var sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    params[2] = bcrypt.hashSync(params[2], bcrypt.genSaltSync(8), null);
    return db.query(sql, params, callback);
  },
  findByEmail: function(email, callback){
    var sql = "SELECT * FROM users WHERE email = ?";
    return db.query(sql, email, callback);
  },
  findById: function(nid, callback){
    console.log('call',nid);
    var sql = "SELECT nid, name, email, role, DATE_FORMAT(updated, '%W %M %e %Y') AS updated FROM users WHERE nid = ?";
    return db.query(sql, nid, callback);
  },
  update: function(params, callback) {
  var sql = "UPDATE users SET name =?, role = ?, updated = NOW() WHERE nid = ?";
  return db.query(sql, params, callback);
},
remove: function(nid, callback) {
   console.log('do');
  var sql = "DELETE FROM users WHERE nid = ?";
  return db.query(sql, nid, callback);
},
  find: function(params, orderby, callback){
    var p = [];
    var sql = "SELECT nid, name, email, role, DATE_FORMAT(updated, '%W %M %e %Y') AS updated  FROM users ";
    sql += " ORDER BY " + orderby[0] + " " + orderby[1];
    if(params[0] != ''|| params[1] != '')
      sql += " WHERE";
      if(params[0] != ''){
        sql += "( name LIKE concat('%',?,'%') OR email LIKE concat('%',?,'%') )";
        p.push(params[0]);
        p.push(params[0]);
        if(params[1] != '') sql += " AND";
      }
      if(params[1] != ''){
        sql += " role = ?";
        p.push(params[1]);
      }
    return db.query(sql, p, callback);
  },
    compare: function(cleartext, encrypted){
    return bcrypt.compareSync(cleartext, encrypted);
  }
};



module.exports = User;
