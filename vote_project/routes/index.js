var express = require('express');
var router = express.Router();
var db = require('../public/js/db_table_account');
/* GET home page. */
router.get('/', function(req, res, next) {
  /** 
   * Check when user login to fb from session
  */
  let user_id = req.session.user_id;
  if(user_id) {
    db.findAll({
      where : {
        id_user: user_id
      }
    }).then(account => {
      console.log(JSON.stringify(account))
      res.render('homepage' , {
        title : 'Homepage',
        user_name : JSON.stringify(account).fullName
      });
    }).catch(function (err) {
      console.log(err);
    });
  } else {
    res.render('login', { title: 'Express' });
  }
  
});

module.exports = router;
