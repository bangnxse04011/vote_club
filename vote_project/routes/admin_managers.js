var express = require('express');
var router = express.Router();
var db_manager_video = require('../public/js/db_table_manager_video');
var util = require('../public/js/unit');

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