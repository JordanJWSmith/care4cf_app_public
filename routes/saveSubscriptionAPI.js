var express = require('express');
const saveSubscription = require('./appDatabase/saveSubscription');
var router = express.Router();

router.post('/', function(req, res, next) {
  // console.log('req body: ', req.body);
  saveSubscription(req.body)
  .then(function(results) {
    res.send(results);
  })
    
  });
  
module.exports = router;