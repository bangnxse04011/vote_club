var express = require('express');
var router = express.Router();
var db_account = require('../public/js/db_table_account');
var db_manager_video = require('../public/js/db_table_manager_video');
/* GET home page. */
router.get('/', function(req, res, next) {
  /** 
   * Check when user login to fb from session
  */
  let user_id = req.session.user_id;
  //---------------------------------------------
  if(user_id) {
    db_account.findOne({
      where : {
        id_user: user_id
      }
    }).then(account => {
      db_manager_video.findAll({
        plain: false
      }).then(video => {
        let video_array = video.map((r) => (r.toJSON()));
        res.render('index' , {
          title : 'Mic On',
          user_name : account.fullName,
          link_login_or_logout : '/log_out',
          data_video_array : video_array
        });
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  //---------------------------------------------
  } else {
    db_manager_video.findAll({
      plain: false
    }).then(video => {
      let video_array = video.map((r) => (r.toJSON()));
      res.render('index', { title: 'Mic On' , user_name : 'Login' , link_login_or_logout : '/authen/fb' , data_video_array : video_array });
    }).catch(function (err) {
      console.log(err);
    });
  }
});

router.get('/log_out' , function(req, res, next) {
  delete req.session.user_id;
  res.redirect('/');
});

router.get('/details/:id', function(req, res, next) {
  /** 
   * Check when user login to fb from session
  */
  let user_profile_video;
  let id_video = req.params['id'];
  console.log(id_video + "---------------------------");
  // find link video form db
  db_manager_video.findOne({
    where : {
      id: id_video
    }
  }).then(link_video => {
    user_profile_video = link_video._previousDataValues;
  });

  //---------------------------------------------
  let user_id = req.session.user_id;
  if(user_id) {
    db_account.findOne({
      where : {
        id_user: user_id
      }
    }).then(account => {
      db_manager_video.findAll({
        plain: false
      }).then(video => {
        let video_array = video.map((r) => (r.toJSON()));
        res.render('details' , {
          title : 'Mic On',
          user_name : account.fullName,
          link_login_or_logout : '/log_out',
          data_video_array : video_array,
          user_profile_video_view : user_profile_video
        });
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
 //---------------------------------------------
  } else {
    db_manager_video.findAll({
      plain: false
    }).then(video => {
      let video_array = video.map((r) => (r.toJSON()));
      res.render('details', { 
        title: 'Mic On' , 
        user_name : 'Login' , 
        link_login_or_logout : '/authen/fb' , 
        data_video_array : video_array,
        user_profile_video_view : user_profile_video
      });
    }).catch(function (err) {
      console.log(err);
    });
  }
});

module.exports = router;
