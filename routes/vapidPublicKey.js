var express = require('express');
var router = express.Router();

// Get the system VAPID key and send it
router.get('/', function(req, res, next) {
    res.send(process.env.VAPID_PUBLIC_KEY);
  });
  
module.exports = router;
