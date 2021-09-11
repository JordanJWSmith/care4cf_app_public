var express = require('express');
var router = express.Router();
var webPush = require('web-push');
const getSubscriptions = require('./appDatabase/getSubscriptions');
var jwt = require('jsonwebtoken');
const sendPush = require('./appDatabase/sendPush');

// Receive a payload and send as notifications
router.post('/', async function(req, res) { 

    console.log('body:', req.body)
    var payload = req.body.payload;

    var counter = 0;

    await getSubscriptions()
    .then(function(subs) {
        for (i=0; i<subs.results.length; i++) {
            var subscription = subs.results[i].subscription
            sendPush(JSON.parse(subscription), payload);
            counter++;
        }

    })
    .then(function() {
        res.send('Sent ' + counter + ' notifications');
    })
        
    
  });

module.exports = router;

