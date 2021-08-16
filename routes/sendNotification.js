var express = require('express');
var router = express.Router();
var webPush = require('web-push');


function Base64EncodeUrl(str){
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

router.post('/', function(req, res) {
    var sub = req.body;
    console.log('sendNotification:', req.body);
    // console.log(webPush.getVapidHeaders());
    console.log('public key: ', process.env.VAPID_PUBLIC_KEY);
    console.log('private key: ', process.env.VAPID_PRIVATE_KEY);
    const subscription = req.body;
    const payload = JSON.stringify({
        "notification": {
            "title": "Example title",
            "body": "This is the body",
        }
    });

    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
    console.log('sendNotif public key: ', vapidPublicKey);
    console.log('sendNotif private key: ', vapidPrivateKey);


    const options = {
      TTL: req.body.ttl,
      vapidDetails: {
        subject: 'mailto:jordan.smith.20@ucl.ac.uk',
        publicKey: Base64EncodeUrl(vapidPublicKey) ,
        privateKey: Base64EncodeUrl(vapidPrivateKey) 
      },
      gcmAPIKey: 'AIzaSyBjJ9i9OfBGzplXujpb-ft_452zF17BIjc'
    };

    setTimeout(function() {
        console.log('webpush details: ', webPush.generateRequestDetails(subscription, payload));
      webPush.sendNotification(subscription, payload)
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(error) {
        res.sendStatus(500);
        console.log(error);
      });
    }, req.body.delay * 1000);
  });

module.exports = router;

// var express = require('express');
// var router = express.Router();
// const axios = require('axios');

// router.get('/', function(req, res, next) {
    
//     axios
//     .post("https://api.cleverpush.com/notification/send", {
//         channelId: "pCGzsj9JXF7JG6rps",
//         title: 'Test Notif'
//     })
//     .then(res => {
//         console.log(`statusCode: ${res.status}`)
//         console.log(res)
//     })
//     .catch(error => {
//         console.error(error)
//     })
    
//     res.send('test');
//   });
  
// module.exports = router;