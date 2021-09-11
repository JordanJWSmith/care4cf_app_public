var express = require('express');
var router = express.Router();
var pushpad = require('pushpad');

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('/');
    
});

module.exports = router;
