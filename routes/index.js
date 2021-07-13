var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('cookies: ', req.cookies.login);
  res.render('index', { title: 'Express - Jordan' });
});



module.exports = router;
