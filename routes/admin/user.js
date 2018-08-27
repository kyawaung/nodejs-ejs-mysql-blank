var express = require('express');
var router = express.Router();
var User = require('../../models/User');


/* GET user home. */
router.all('/list', function(req, res, next) {
  var params = [req.body.keyword || '', req.body.role || ''];
  var orderby = [req.body.sortField || 'updated', req.body.sortOrder || 'DESC' ];
  User.find(params, orderby, function(err, users) {
    res.render('admin/users/user-list', {
      users: users,
      sort: {field: orderby[0], order: orderby[1]},
      search: {
        keyword: req.body.keyword,
        role: req.body.role
      }
    });
  });
});

/* GET user view home. */
router.get('/view/:nid', function(req, res, next) {
User.findById(req.params.nid,function(err, user) {
  if (err) throw err;
  if(user.length == 0) next(new Error('User data not found!'));
  res.render('admin/users/user-view', { user: user[0] });
});
});

//get modify
router.get('/modify/:nid', function(req, res, next) {
User.findById( req.params.nid,function(err, user) {
 if (err) throw err;
 if(user.length == 0) next(new Error('User data not found!'));
 res.render('admin/users/user-modify', { title: 'User View', user: user[0] });
});
});

//post modify action
router.post('/modify', function(req, res, next) {
var params = [req.body.name, req.body.role, req.body.nid];
User.findById(req.body.nid, function(err, user) {
  if (err) throw err;
  if(user.length == 0) next(new Error('User data not found!'));
  User.update(params, function(uerr, uuser){
    if(uerr) throw uerr;
    req.flash('info', 'Success');
    res.redirect('/admin/users/view/'+ uuser.affectedRows);
  });
});
})

//post remove action.
router.post('/remove', function(req, res, next) {
User.remove(req.body.nid, function(err, user) {
  console.log('Nay Linn Oo', user);
  if (err) throw err;
  req.flash('info', 'Successfully');
  res.redirect('/admin/users/list');
});
});

module.exports = router;
