var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.end("okie" + req.session.user_id);
});

module.exports = router;
