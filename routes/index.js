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
const getRoutine = require('./appDatabase/getRoutine');
const checkForDate = require('./appDatabase/checkForDate');
const getWeekActivities = require('./appDatabase/getWeekActivities');
var router = express.Router();


router.get('/', function(req, res, next) {
  var cookieToken = req.cookies.accessToken;
  // console.log('integerCheck:', Number.isInteger(parseInt('5')));
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
              getWeekActivities(results.userID, 0)
              .then(function(weekResults) {
                // console.log('routineResults: ', getRoutineResults);
                // console.log('startDate: ', weekResults.startDate);

                var prevDay = "decrementDate()";
                var nextDay = "incrementDate()";

                res.render('logActivity', {
                title: 'Welcome user '+ results.userID, 
                user: results.userID,
                routineTypes: JSON.stringify(routineResults),
                weekActivities: JSON.stringify(weekResults.routine),
                dateList: JSON.stringify(weekResults.dateList),
                startDate: JSON.stringify(weekResults.startDate),
                routineDict: JSON.stringify(weekResults.routineDict),
                prevDay: prevDay,
                nextDay: nextDay
                })
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
            
          })
            
        }
      })
      
    }
  })
});



router.post('/scheduleData', async function(req, res, next) {
  const scheduleDetails = req.body;
  // console.log('scheduleDetails: ', scheduleDetails);

  req.session.chosenDate = null;
  req.session.activityType = null;
  req.session.saveAsNormal = null;

  await saveSchedule(scheduleDetails)

  .then(async function(results) {

    if ((Object.keys(scheduleDetails).includes('activityType')) && (Object.keys(scheduleDetails).includes('chosenDate'))) {
      // console.log('index schedID: ', results[1][0]['LAST_INSERT_ID()']);
      var scheduleID = results[1][0]['LAST_INSERT_ID()'];
      
      await logDifferent(scheduleDetails.user, scheduleDetails.chosenDate, scheduleID, scheduleDetails.activityType)
      // res.redirect('/')
      .then(res.redirect('/'))
    } else {
      res.redirect('/');
    }
  })
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
    req.session.chosenDate = JSON.stringify(details.chosenDate);
    req.session.activityType =  details.activityType;
    req.session.saveAsNormal = false;
    req.session.savedScheds = true;
    res.redirect('/somethingDifferent');
    
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
});


router.post('/noActivities', async function(req, res, next) {
  var reasonID = req.body.reasonID;
  var details = JSON.parse(req.body.details);
  await logNoActivities(details.user, details.chosenDate, details.activityType, reasonID)
  .then(res.redirect('/'))

})

router.get('/w/:offset', function(req, res, next) {
  var offset = req.params.offset;
  if (!(Number.isInteger(parseInt(offset)))) {
    console.log('incorrect offset');
    res.redirect('/');
  } else {
    var r = req.query.r;
    console.log('r: ', r);

    // console.log(typeof offset);
    // res.send(offset);
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
              getWeekActivities(results.userID, parseInt(offset))
                .then(function(weekResults) {
                  // console.log('weekResults: ', weekResults);
                  if (r) {
                    // console.log('r true');
                    var dateList = weekResults.dateList.reverse()
                    var prevDay = "incrementDate()";
                    var nextDay = "decrementDate()";
                    
                  } else {
                    var dateList = weekResults.dateList
                    var prevDay = "decrementDate()";
                    var nextDay = "incrementDate()";
                  }

                  res.render('logActivity', {
                    title: 'Welcome user '+ results.userID, 
                    user: results.userID,
                    routineTypes: JSON.stringify(routineResults),
                    weekActivities: JSON.stringify(weekResults.routine),
                    dateList: JSON.stringify(dateList),
                    startDate: JSON.stringify(weekResults.startDate),
                    routineDict: JSON.stringify(weekResults.routineDict),
                    prevDay: prevDay,
                    nextDay: nextDay
                    })
                })
            })
          }
        })
      }
    })
  }

})


module.exports = router;
