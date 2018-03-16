var express = require('express');
var router = express.Router();
var db_manager_video = require('../public/js/db_table_manager_video');
var db_account = require('../public/js/db_table_account');
var util = require('../public/js/unit');
var fs = require('fs');
/**
 * Create file users.txt
 */
router.get('/download_file', function(req, res, next) {
    let uname_session = req.session.uname;
    if(uname_session == null || uname_session == '' || uname_session == "") {
        res.redirect('/admin/');
    }
    db_account.findAll({
        plain: false
    }).then(account => {
        var file = fs.createWriteStream('data_users.csv');
        file.on('error', function(err) {});
        let account_details = account.map((r) => (r.toJSON()));
        for (let index = 0; index < account_details.length; index++) {
            file.write(account_details[index]['fullName'] + "," +  account_details[index]['email'] + ", https://www.facebook.com/" +  account_details[index]['id_user'] + '\r\n');
        }
        file.end();
        res.end("Create file successfully.")
    }).catch(function (err) {
        console.log("error" + err);
    });
});

/**
 * Method find all DB
 */
router.get('/find_all', function(req, res, next) {
    db_manager_video.findAll({
        plain: false
    }).then(video => {
        let video_array = video.map((r) => (r.toJSON()));
        res.end(JSON.stringify(video_array));
    }).catch(function (err) {
        console.log(err);
        res.render('error');
    });
});

/**
 * Find all by ID
 */
router.get('/find_video_by_id/:id', function(req, res, next) {
    let id_video = req.params['id'];
    db_manager_video.findAll({
        where : {
            id: id_video
        },
        plain: false
    }).then(video => {
        let video_array = video.map((r) => (r.toJSON()));
        res.end(JSON.stringify(video_array));
    }).catch(function (err) {
        console.log(err);
        res.render('error');
    });
});

module.exports = router;