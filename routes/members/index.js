var express = require('express');
var router = express.Router();

/* GET admin home. */
router.get('/', function(req, res, next) {
  res.render('members/home');
});

module.exports = router;
