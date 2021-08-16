// // var express = require('express');
// // var router = express.Router();
// // var webPush = require('web-push');

// // router.post('/', function(req, res) {
// //     const subscription = req.body.subscription;
// //     const payload = null;
// //     const options = {
// //       TTL: req.body.ttl
// //     };

// //     setTimeout(function() {
// //       webPush.sendNotification(subscription, payload, options)
// //       .then(function() {
// //         res.sendStatus(201);
// //       })
// //       .catch(function(error) {
// //         res.sendStatus(500);
// //         console.log(error);
// //       });
// //     }, req.body.delay * 1000);
// //   });

// // module.exports = router;

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