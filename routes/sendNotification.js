var express = require('express');
var router = express.Router();
var webPush = require('web-push');
const getSubscriptions = require('./appDatabase/getSubscriptions');
var jwt = require('jsonwebtoken');


function Base64EncodeUrl(str){
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

router.post('/', async function(req, res) {
    
    // PUT THIS IN SEPARATE FUNCTION AND CALL sendNotification ON EACH RESULT
    await getSubscriptions()
    .then(function(results) {
        // console.log('subs: ', results)
        for (i=0; i<results.results.length; i++) {
            if (results.results[i].pushNotificationKey !== null) {
                var subResult = JSON.parse(JSON.parse(results.results[i].pushNotificationKey));
                // console.log(subResult);
            }
        }
    })
    
    // console.log(webPush.getVapidHeaders());
    // console.log('public key: ', process.env.VAPID_PUBLIC_KEY);
    // console.log('private key: ', process.env.VAPID_PRIVATE_KEY);
    const subscription = req.body;
    console.log('sendNotification:', subscription);
    // console.log('endpoint: ', subscription.endpoint);
    const payload = 'Hello! This is care4cf';

    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
    console.log('sendNotif public key: ', vapidPublicKey);
    console.log('sendNotif private key: ', vapidPrivateKey);
    // console.log('base64 encoded public key: ', Base64EncodeUrl(vapidPublicKey));
    // console.log('base64 encoded private key: ', Base64EncodeUrl(vapidPrivateKey));



    // const options = {
    //   TTL: req.body.ttl,
    //   vapidDetails: {
    //     subject: 'mailto:jordan.smith.20@ucl.ac.uk',
    //     publicKey: Base64EncodeUrl(vapidPublicKey) ,
    //     privateKey: Base64EncodeUrl(vapidPrivateKey) 
    //   },
    //   gcmAPIKey: 'AIzaSyBjJ9i9OfBGzplXujpb-ft_452zF17BIjc',
    //     headers: {Authorization: 'test'}
    // };

    setTimeout(function() {

        console.log('webpush details: ', webPush.generateRequestDetails(subscription, payload));
        // console.log('Authorization header: ', webPush.generateRequestDetails(subscription, payload, options).headers.Authorization);
        // var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTYyOTI0MDI3OCwic3ViIjoibWFpbHRvOmpvcmRhbi5zbWl0aC4yMEB1Y2wuYWMudWsifQ._de1AbmVKm7VJhPw4i86fHpBpTsT9yFEt4iQtylHtHQUqrzVgdGxEc8-rWDT3kJphrlhVey6E947LQfPcA0iyg'
        // jwt.verify(token, vapidPublicKey, function(results) {
        //     console.log('verify jwt: ', results);
        // })
        webPush.sendNotification(subscription, payload)
        .then(function() {
            res.sendStatus(201);
        })
        .catch(function(error) {
            res.sendStatus(500);
            console.log(error);
        });
    }, req.body.delay * 1000)
        
        
    
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