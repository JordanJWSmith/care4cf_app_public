var express = require('express');
const saveSubscription = require('./appDatabase/saveSubscription');
var router = express.Router();

// Receive subscription object and save in the database
// Send the results
router.post('/', function(req, res, next) {
  saveSubscription(req.body)
  .then(function(results) {
    res.send(results);
  })
    
  });
  
module.exports = router;