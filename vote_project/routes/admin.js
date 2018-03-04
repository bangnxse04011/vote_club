var express = require('express');
var router = express.Router();
var db_account_admin = require('../public/js/db_table_account_admin');
var util = require('../public/js/unit');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('adminCP');
});

/**
 * 
 */
router.get('/log_out' , function(req, res, next) {
  delete req.session.uname;
  res.redirect('/admin/');
});
/**
 * Method check user login
 */
router.post('/authen', function(req, res, next) {
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  let uname = req.body.uname;
  let passwd = req.body.passwd;
  db_account_admin.findAll({
      where : {
        username: uname,
        password: passwd
      }
    }).then(account => {
      let account_details = account.map((r) => (r.toJSON()));
      req.session.uname = uname;
      // if(account == null || account == '' || account.length == 0) {
      // db_account_admin.create({
      //   fullName : "Nguyen Van Admin",
      //   username: uname,
      //   password : passwd,
      //   status : 0
      // });
      if(account.length > 0) 
        res.redirect("/admin/cp");
      // } else {
        // let active = account_details['status'];
        // res.redirect("/cp");
      // }
      
    }).catch(function (err) {
      console.log(err);
    });
});

router.get('/cp', function(req, res, next) {
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  res.render('admin');
});

module.exports = router;