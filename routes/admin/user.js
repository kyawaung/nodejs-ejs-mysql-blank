var express = require('express');
var router = express.Router();
var User = require('../../models/User');


/* GET user home. */
router.all('/list', function(req, res, next) {
  var params = [req.body.keyword || '', req.body.role || ''];
  User.find(params, function(err, users) {
    res.render('admin/users/user-list', {
      users: users,
      search: {
        keyword: req.body.keyword,
        role: req.body.role
      }
    });
  });
});

module.exports = router;
