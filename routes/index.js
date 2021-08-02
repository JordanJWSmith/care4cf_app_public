var express = require('express');
var session = require('express-session');
const login = require('./appDatabase/login');
const checkForNormal = require('./appDatabase/checkForNormal')
const getTechniques = require('./appDatabase/getTechniques');
const getDurations = require('./appDatabase/getDurations');
const getAdjuncts = require('./appDatabase/getAdjuncts');
const getAdjunctTimes = require('./appDatabase/getAdjunctTimes');
const saveSchedule = require('./appDatabase/saveSchedule');
const logNormal = require('./appDatabase/logNormal');
const logNoActivities = require('./appDatabase/logNoActivities');
const logDifferent = require('./appDatabase/logDifferent');
const getRoutineTypes = require('./appDatabase/getRoutineTypes');
const getNoActivityReasons = require('./appDatabase/getNoActivityReasons');
const getFrequencies = require('./appDatabase/getFrequencies');
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
          getRoutineTypes()
          .then(function(routineResults) {
            res.render('logActivity', {
              title: 'Welcome user '+ results.userID, 
              user: results.userID,
              routineTypes: JSON.stringify(routineResults)
            })
          })
          
        } else {
          getTechniques()
          .then(function(techResults) {
            getDurations()
            .then(function(durationResults) {
              getAdjuncts()
              .then(function(adjunctResults) {
                getAdjunctTimes()
                .then(function(adjunctTimeResults) {
                  getFrequencies()
                  .then(function(frequencyResults) {
                    res.render('newSchedule', {
                      title: 'Welcome, user ' + results.userID +'.', 
                      user: results.userID, 
                      techniques: JSON.stringify(techResults),
                      durations: JSON.stringify(durationResults),
                      adjuncts: JSON.stringify(adjunctResults),
                      adjunctTimes: JSON.stringify(adjunctTimeResults),
                      frequencies: JSON.stringify(frequencyResults),
                      chosenDate: false,
                      activityType: false,
                      saveAsNormal: true
                    })
                  }
                    
                  )
                  
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
  // console.log('scheduleDetails: ', scheduleDetails);

  req.session.chosenDate = null;
  req.session.activityType = null;
  req.session.saveAsNormal = null;

  await saveSchedule(scheduleDetails)

  .then(async function(results) {

    // console.log(Object.keys(scheduleDetails));
    // console.log(Object.keys(scheduleDetails).includes('activityType'));
    
    if ((Object.keys(scheduleDetails).includes('activityType')) && (Object.keys(scheduleDetails).includes('chosenDate'))) {
      // console.log('index schedID: ', results[1][0]['LAST_INSERT_ID()']);
      var scheduleID = results[1][0]['LAST_INSERT_ID()'];
      
      await logDifferent(scheduleDetails.user, scheduleDetails.chosenDate, scheduleID, scheduleDetails.activityType)
      // res.redirect('/')
      .then(res.redirect('/'))
    }
    
  })
  
    
    
  // res.send(scheduleDetails);
});


router.post('/logNewActivity', async function(req, res, next) {
  const details = req.body;
  // console.log('activity type: ', details.activityType);
  console.log('(index) date: ', details.chosenDate, typeof details.chosenDate);
  // console.log('user: ', details.user);
  if (details.activityType == 0) {
    console.log('logging normal activity');
    await logNormal(details.user, details.chosenDate, details.activityType)
    .then(res.send(details));

  } else if (details.activityType == 1) {
    console.log('logging something different');
    // req.headers['someHeader'] = 'someValue';
    // res.set({
    //   'chosenDate': details.chosenDate,
    //   'activityType': details.activityType
    // })
    // res.header('chosenDate', details.chosenDate)
    // var string = encodeURIComponent('something that would break');
    // res.redirect('/?valid=' + string);
    // res.redirect('/somethingDifferent?valid='+string);

    // req.session.chosenDate = '"' +  details.chosenDate  + '"';
    req.session.chosenDate = JSON.stringify(details.chosenDate);
    req.session.activityType =  details.activityType;
    req.session.saveAsNormal = false;
    res.redirect('/somethingDifferent');
    
    // res.redirect('/somethingDifferent?chosendate='+details.chosenDate+'&activityType='+details.activityType);
    
    

  } else if (details.activityType == 2) {
    console.log('logging no activities');
    await getNoActivityReasons()
    .then(function(results) {
      res.render('noActivity', {
        title: 'Tell us why', 
        details: JSON.stringify(details), 
        reasons: JSON.stringify(results)
      });
    })
  }
  // res.send(details);

  // if (req.body.activityType == "0") {
  //   // await logNormal(details.user, details.chosenDate)
  //   console.log('activity type 0')
  // .then(res.send(details));
  // } else {
  //   res.send('activity type failed');
  // }
  
  
});


router.post('/noActivities', async function(req, res, next) {
  var reasonID = req.body.reasonID;
  var details = JSON.parse(req.body.details);
  await logNoActivities(details.user, details.chosenDate, details.activityType, reasonID)
  .then(res.redirect('/'))

})


module.exports = router;
