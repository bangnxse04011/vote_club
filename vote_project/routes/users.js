var express = require('express');
var router = express.Router();
var db_account = require('../public/js/db_table_account');
var db_manager_video = require('../public/js/db_table_manager_video');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.end("okie" + req.session.user_id);
});

router.get('/find_by_name', function(req, res, next) {
  let video_array;
  let user_id = req.session.user_id;
  let name_search = req.query.name_search;
  db_manager_video.findAll({
    where: {
      full_name: {
        ilike: '%' + name_search
      }
    },
    plain: false
  }).then(video => {
    video_array = video.map((r) => (r.toJSON()));
  }).catch(function (err) {
    console.log(err);
  });
  // Check if user login
  if(user_id) {
    db_account.findOne({
      where : {
        id_user: user_id
      }
    }).then(account => {
      res.render('search' , {
        title : 'Mic On',
        user_name : account.fullName,
        link_login_or_logout : '/log_out',
        data_video_array : video_array
      });
    }).catch(function (err) {
      console.log(err);
    });
  //---------------------------------------------
  } else {
    res.render('search', { title: 'Mic On' , user_name : 'Login' , link_login_or_logout : '/authen/fb' , data_video_array : video_array });
  }
});

module.exports = router;
