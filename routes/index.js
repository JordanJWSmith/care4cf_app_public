var express = require('express');
const login = require('./appDatabase/login');
const checkForNormal = require('./appDatabase/checkForNormal')
const getTechniques = require('./appDatabase/getTechniques');
const getDurations = require('./appDatabase/getDurations');
const getAdjuncts = require('./appDatabase/getAdjuncts');
const getAdjunctTimes = require('./appDatabase/getAdjunctTimes');
const saveSchedule = require('./appDatabase/saveSchedule');
const logNormal = require('./appDatabase/logNormal');
const logNoActivities = require('./appDatabase/logNoActivities');
var router = express.Router();


router.get('/', function(req, res, next) {
  var cookieToken = req.cookies.accessToken;
  login(cookieToken).then(function(results) {
    if (!results.logIn) {
      console.log('user not logged in at index. Redirecting to login...')
      res.redirect('/loginUser');
    } else {
      checkForNormal(results.userID)
      .then(function(checkResults) {
        if (checkResults.scheduleExists) {
          res.render('logActivity', {title: 'Welcome user '+ results.userID, user: results.userID})
        } else {
          getTechniques()
          .then(function(techResults) {
            getDurations()
            .then(function(durationResults) {
              getAdjuncts()
              .then(function(adjunctResults) {
                getAdjunctTimes()
                .then(function(adjunctTimeResults) {
                  res.render('newSchedule', 
                  {title: 'Welcome, user ' + results.userID +'.', 
                  user: results.userID, 
                  techniques: JSON.stringify(techResults),
                  durations: JSON.stringify(durationResults),
                  adjuncts: JSON.stringify(adjunctResults),
                  adjunctTimes: JSON.stringify(adjunctTimeResults),
                  saveAsNormal: true
                  })
                })
                
              })
              
            })
            // console.log(results);
            
          })
            
        }
      })
      
    }
  })
  // res.render('index', {title: 'Welcome'});
});
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   // console.log('cookies: ', req.cookies.login);
//   res.render('index', { title: 'Express - Jordan' });
// });

router.post('/scheduleData', async function(req, res, next) {
  const scheduleDetails = req.body;
  // console.log('details: ', userDetails);
  await saveSchedule(scheduleDetails)
  .then(res.redirect('/'));
  // res.send(scheduleDetails);
});

router.post('/logNewActivity', async function(req, res, next) {
  const details = req.body;
  // console.log('activity type: ', details.activityType);
  // console.log('date: ', details.chosenDate);
  // console.log('user: ', details.user);
  if (details.activityType == 0) {
    console.log('logging normal activity');
    await logNormal(details.user, details.chosenDate, details.activityType);
  } else if (details.activityType == 2) {
    console.log('logging no activities');
    await logNoActivities(details.user, details.chosenDate, details.activityType);
  }
  res.send(details);

  // if (req.body.activityType == "0") {
  //   // await logNormal(details.user, details.chosenDate)
  //   console.log('activity type 0')
  // .then(res.send(details));
  // } else {
  //   res.send('activity type failed');
  // }
  
  
})


module.exports = router;
