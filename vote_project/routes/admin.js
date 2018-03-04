var express = require('express');
var router = express.Router();
var db_account = require('../public/js/db_table_account');
var db_manager_video = require('../public/js/db_table_manager_video');
var db_manager_like = require('../public/js/db_table_manager_like');
var util = require('../public/js/unit');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin');
});

module.exports = router;