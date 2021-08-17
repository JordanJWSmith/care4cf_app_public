var express = require('express');
const checkSubExists = require('./appDatabase/checkSubExists');

var router = express.Router();

router.post('/', function(req, res, next) {
  // console.log('req body: ', req.body);
  var subscription = req.body;
  checkSubExists(subscription)
  .then(function(results) {
    res.send(results);
  })
    
});
  
module.exports = router;