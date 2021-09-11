var express = require('express');
var router = express.Router();
var webPush = require('web-push');

// Receive subscription data and send a notification
router.post('/', async function(req, res) {
  var subscription = req.body;

  var payload = null;
  var options = {
    TTL: 0
  };

  await webPush.sendNotification(subscription, payload, options)
  .then(res.send(req.body))
  
});

module.exports = router;