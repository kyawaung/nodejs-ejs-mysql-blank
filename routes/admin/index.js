var express = require('express');
var router = express.Router();

/*  admin role check. */
router.use('/', function(req, res, next) {
  if(req.session.user.role == 'ADMIN'){
    next();
  }else{
    req.flash('warning', 'Not allowed user! Please login with admin');
    res.redirect('/signin'); // redirect to other page.
  }
});

/* GET admin home. */
router.get('/', function(req, res, next) {
  res.render('admin/home');
});

module.exports = router;
