var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  if(req.session.user_id) {
    res.end('Okiee_login');
  } else {
      res.end('Okiee');
  }
});

module.exports = router;
