var express = require('express');
const checkSubExists = require('./appDatabase/checkSubExists');

var router = express.Router();

// Check whether the current subscription is saved in the DB
// and send the result as a response
router.post('/', function(req, res, next) {
  var subscription = req.body;
  checkSubExists(subscription)
  .then(function(results) {
    res.send(results);
  })
    
});
  
module.exports = router;