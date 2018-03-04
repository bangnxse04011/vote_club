var express = require('express');
var router = express.Router();
var db_account = require('../public/js/db_table_account');
var db_manager_video = require('../public/js/db_table_manager_video');
var db_manager_like = require('../public/js/db_table_manager_like');
var util = require('../public/js/unit');

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
  let host = util._DB_HOST();
  let user_profile_video;
  let user_like_video_id = false;
  let id_video = req.params['id'];
  let total_like = 0;
  let link_avata_button_like = '/img/heart.png'
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
        //Find total like and user login like video
        db_manager_like.findAll({
          where : {
            id_video: id_video
          }
        }).then(manager_like => {
          let manager_like_video = manager_like.map((r) => (r.toJSON()));
          total_like = manager_like_video.length;
          for(var i = 0 ; i < manager_like_video.length ; i++) {
            if(manager_like[i]['id_user'] == user_id ) {
              user_like_video_id = true;
              link_avata_button_like = '/img/like.png';
              break;
            }
          }
          res.render('details' , {
            host : host,
            title : 'Mic On',
            user_name : account.fullName,
            link_login_or_logout : '/log_out',
            data_video_array : video_array,
            user_profile_video_view : user_profile_video,
            total_like : total_like,
            user_like_video_id  : user_like_video_id,
            link_avata_button_like : link_avata_button_like
          }); 
        });
      })
    }).catch(function (err) {
      console.log(err);
    });
 //---------------------------------------------
  } else {
    db_manager_video.findAll({
      plain: false
    }).then(video => {
      let video_array = video.map((r) => (r.toJSON()));
      db_manager_like.findAll({
        where : {
          id_video: id_video
        }
      }).then(manager_like => {
        let manager_like_video = manager_like.map((r) => (r.toJSON()));
        total_like = manager_like_video.length;
        res.render('details', { 
          host : host,
          title: 'Mic On' , 
          user_name : 'Login' , 
          link_login_or_logout : '/authen/fb' , 
          data_video_array : video_array,
          user_profile_video_view : user_profile_video,
          total_like : total_like,
          user_like_video_id  : user_like_video_id,
          link_avata_button_like : link_avata_button_like
        });
      });
    }).catch(function (err) {
      console.log(err);
    });
  }
});

module.exports = router;
