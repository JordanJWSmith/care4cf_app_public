var express = require('express');
const login = require('./appDatabase/login');
const checkForNormal = require('./appDatabase/checkForNormal')
const getTechniques = require('./appDatabase/getTechniques');
const getDurations = require('./appDatabase/getDurations');
const getAdjuncts = require('./appDatabase/getAdjuncts');
const getAdjunctTimes = require('./appDatabase/getAdjunctTimes');
const saveSchedule = require('./appDatabase/saveSchedule');
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
          res.render('index', {title: 'Welcome user '+ results.userID})
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

router.post('/scheduleData', function(req, res, next) {
  const scheduleDetails = req.body;
  // console.log('details: ', userDetails);
  saveSchedule(scheduleDetails);
  res.send(scheduleDetails);
});


module.exports = router;
