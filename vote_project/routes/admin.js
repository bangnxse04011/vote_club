var express = require('express');
var router = express.Router();
var db_manager_video = require('../public/js/db_table_manager_video');
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
      if(account.length > 0) {
        res.redirect("/admin/cp");
      } else {
        res.redirect("/admin/");
      }      
    }).catch(function (err) {
      console.log(err);
    });
});

router.get('/cp', function(req, res, next) {
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  res.render("admin" , { message : "" });
});

/** 
 * Method add account admin.
*/
router.post('/add_account' , function(req, res, next) {
  let uname_session = req.session.uname;
  let uname = req.body.uname;
  let passwd = req.body.passwd;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  db_account_admin.findAll({
    where : {
      username: uname,
      password: passwd
    }
  }).then(account => {
    let account_details = account.map((r) => (r.toJSON()));
    req.session.uname = uname;
    if(account_details.length <= 0 || account_details == '') {
      db_account_admin.create({
        username: uname,
        password : passwd,
        status : 0
      });
      res.redirect("/admin/cp");
    } 
    if(account_details.length > 0) {
      res.redirect("/admin/");
    }   
  }).catch(function (err) {
    console.log(err);
  });
});

/** 
 * Method add video
*/
router.get('/add_view' , function(req, res, next) {
  let title_video = req.params['title_video'];
  let id_video = req.params['id_video'];
  let description = req.params['description'];
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  db_manager_video.create({
    id_user: '1',
    link_video : id_video,
    description : description,
    full_name : title_video
  });
  res.redirect("/admin/cp");
});
module.exports = router;