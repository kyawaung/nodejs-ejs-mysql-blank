var express = require('express');
var router = express.Router();

/*  admin role check. */
router.use('/', function(req, res, next) {
  if(req.session.user.role == 'USER'){
    next();
  }else{
    req.flash('warning', 'Not allowed user! Please login');
    res.redirect('/signin'); // redirect to other page.
  }
});

/* GET members home. */
router.get('/', function(req, res, next) {
  res.render('members/home');
});

module.exports = router;
