var express = require('express');
var router = express.Router();
var db_account = require('../public/js/db_table_account');
var db_manager_video = require('../public/js/db_table_manager_video');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {
  db_manager_video.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('full_name')) ,'full_name'],
    ],
    plain: false
  }).then(video => {
    let video_array = video.map((r) => (r.toJSON()));
    res.end(JSON.stringify(video_array));
  }).catch(function (err) {
    console.log(err);
  });
});

router.get('/find_by_name', function(req, res, next) {
  let user_id = req.session.user_id;
  let name_search = req.query.name_search;
  // Check if user login
  if(user_id) {
    db_account.findOne({
      where : {
        id_user: user_id
      }
    }).then(account => {
      db_manager_video.findAll({
        where: {
          full_name: {
            like: '%' + name_search + '%'
          }
        },
        plain: false
      }).then(video => {
        let video_array = video.map((r) => (r.toJSON()));
        res.render('search' , {
          title : 'Mic On',
          user_name : account.fullName,
          link_login_or_logout : '/log_out',
          data_video_array : video_array,
          name_search_res : req.query.name_search
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
      where: {
        full_name: {
          like: '%' + name_search + '%'
        }
      },
      plain: false
    }).then(video => {
      let video_array = video.map((r) => (r.toJSON()));
      res.render('search', { title: 'Mic On' , user_name : 'Login' , link_login_or_logout : '/authen/fb' , data_video_array : video_array, name_search_res : req.query.name_search });
    }).catch(function (err) {
      console.log(err);
    });
  }
});

module.exports = router;
