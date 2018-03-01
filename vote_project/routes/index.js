var express = require('express');
var router = express.Router();
var db_account = require('../public/js/db_table_account');
var db_manager_video = require('../public/js/db_table_manager_video');
/* GET home page. */
router.get('/', function(req, res, next) {
  /** 
   * Check when user login to fb from session
  */
 var video_array;
 db_manager_video.findAll({
    plain: false
  }).then(video => {
    video_array = video.map((r) => (r.toJSON()));
    console.log(video_array);
  }).catch(function (err) {
    console.log(err);
  });
  let user_id = req.session.user_id;
  if(user_id) {
    db_account.findOne({
      where : {
        id_user: user_id
      }
    }).then(account => {
      res.render('index' , {
        title : 'Mic On - Medoly Club',
        user_name : account.fullName,
        link_login_or_logout : '/log_out',
        data_video_array : video_array
      });
    }).catch(function (err) {
      console.log(err);
    });
  } else {
    res.render('index', { title: 'Mic On' , user_name : 'Login' , link_login_or_logout : '/authen/fb' , data_video_array : video_array });
  }
});

router.get('/log_out' , function(req, res, next) {
  delete req.session.user_id;
  res.redirect('/');
});

module.exports = router;
