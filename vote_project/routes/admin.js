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
      req.session.status = account_details[0]['status']
      req.session.uname = uname;
      if(account.length > 0) {
        res.redirect("/admin/cp");
      } else {
        res.redirect("/admin/");
      }      
    }).catch(function (err) {
      console.log(err);
      res.render('error');
    });
});

router.get('/cp', function(req, res, next) {
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  res.render("admin" , { title : "Admin manager", status : req.session.status });
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
    res.render('error');
  });
});

/** 
 * Method add video
*/
router.get('/add_view' , function(req, res, next) {
  let title_video = req.query.title_video;
  let id_video = req.query.id_video;
  let description = req.query.description;
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  db_account_admin.findAll({
    where : {
      username: uname_session
    }
  }).then(account => {
    let account_details = account.map((r) => (r.toJSON()));
    db_manager_video.create({
      id_user: account_details.length + 1,
      link_video : id_video,
      description : description,
      full_name : title_video
    });
    res.redirect("/admin/cp");
  });
});

/**
 * Update video
 */
router.get('/update_video' , function(req, res, next) {
  let id_video = req.query.id;
  let full_name = req.query.full_name;
  let description = req.query.description;
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  db_manager_video.update({
    full_name : full_name,
    description: description
  },
  { 
    where: 
    { 
      id: id_video
    } 
  }).then(account => {
    res.redirect("/admin/cp");
  });
});


/* GET users listing. */
router.get('/view_all', function(req, res, next) {
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  db_account_admin.findAll({
    plain: false
  }).then(account => {
    let account_details = account.map((r) => (r.toJSON()));
    let status =  req.session.status;
    if(status == '-1' || status == -1) {
      for(var i = 0 ; i < account_details.length ; i ++) {
        if(account_details[i]['status'] == -1){
            delete account_details[i];
        }
      }
      res.end(JSON.stringify(account_details));
    } else {
      res.end("M ko có đủ quyền để xem nhé ahihi!");
    }
    
  }).catch(function (err) {
    console.log(err);
    res.render('error');
  });
});

/**
 * DELETE acc
 */
router.get('/delete_acc/:id' , function(req, res, next) {
  let uname_session = req.session.uname;
  let id = req.params['id'];
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  let status =  req.session.status;
  if(status == -1 || status == '-1') {
    db_account_admin.destroy({
      where: {
        id : id,
      }
    });
    res.redirect("/admin/cp");
  } else {
    res.redirect("/admin/cp");
  }
});

/**
 * DELETE acc
 */
router.get('/delete_video' , function(req, res, next) {
  let id_delete = req.query.id_delete;
  let uname_session = req.session.uname;
  if(uname_session == null || uname_session == '' || uname_session == "") {
    res.redirect('/admin/');
  }
  db_manager_video.destroy({
    where: {
      id : id_delete,
    }
  });
  res.redirect("/admin/cp");
});

module.exports = router;