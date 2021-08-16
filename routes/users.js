var express = require('express');
var router = express.Router();
var pushpad = require('pushpad');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  // var project = new pushpad.Pushpad({
  //   authToken: '0a6db2f32a24835758c909282cf92bb3',
  //   projectId: '7781'
  // });

  // // console.log(project);

  // var notification = new pushpad.Notification({
  //   project: project,
  //   body: 'Hello world!',
  //   title: 'Website Name', // optional, defaults to your project name
  //   // targetUrl: 'https://example.com', // optional, defaults to your project website
  //   // iconUrl: 'https://example.com/assets/icon.png', // optional, defaults to the project icon
  //   // imageUrl: 'https://example.com/assets/image.png', // optional, an image to display in the notification content
  //   // ttl: 604800, // optional, drop the notification after this number of seconds if a device is offline
  //   requireInteraction: true, // optional, prevent Chrome on desktop from automatically closing the notification after a few seconds
  //   silent: false, // optional, enable this option if you want a mute notification without any sound
  //   urgent: false, // optional, enable this option only for time-sensitive alerts (e.g. incoming phone call)
  //   customData: '123', // optional, a string that is passed as an argument to action button callbacks
  //   // optional, add some action buttons to the notification
  //   // see https://pushpad.xyz/docs/action_buttons
  //   actions: [
  //     {
  //       title: 'My Button 1',
  //       // targetUrl: 'https://example.com/button-link', // optional
  //       // icon: 'https://example.com/assets/button-icon.png', // optional
  //       action: 'myActionName' // optional
  //     }
  //   ],
  //   starred: true, // optional, bookmark the notification in the Pushpad dashboard (e.g. to highlight manual notifications)
  //   // optional, use this option only if you need to create scheduled notifications (max 5 days)
  //   // see https://pushpad.xyz/docs/schedule_notifications
  //   // sendAt: new Date(), // 2016-07-25 10:09 UTC
  //   // optional, add the notification to custom categories for stats aggregation
  //   // see https://pushpad.xyz/docs/monitoring
  //   customMetrics: ['examples', 'another_metric'] // up to 3 metrics per notification
  // });

  // var user1 = '160';

  // notification.deliverTo(user1, function (err, result) {
  //   console.log('Send notification to user:', user1);
  //   console.log(err || result);
  // });

  res.render('pushTest', {title:'Notification Test'});
    
});

module.exports = router;
