var express = require('express');
var router = express.Router();
var webPush = require('web-push');

router.post('/', async function(req, res) {
    console.log(req.body);
  // A real world application would store the subscription info.
//   console.log('/register page: ', req.body);
  var subscription = req.body;
//   subscription.keys = {
//       p256dh: 'BGu5DMiU-E94vh61vHg6_578lADZZSKJzRfsugu5CJo24u7YIDOeNKCiSG_JlTtCFLTyXYi4gk8BlsXiEE9w79g',
//       auth: 'RP4Klyp8P6DZtA68O4noR3gzf70r1KEnILCqUsqkE3M'
//   }
  var payload = null;
  var options = {
    TTL: 0
  };
  console.log('subscription: ', req.body);

  await webPush.sendNotification(subscription, payload, options)
  .then(res.send(req.body))
  
});

module.exports = router;