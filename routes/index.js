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
const getWeekActivities = require('./appDatabase/getWeekActivities');
const promptToEditNormal = require('./appDatabase/promptToEditNormal');
const getAllNormals = require('./appDatabase/getAllNormals');
const getAllActivities = require('./appDatabase/getAllActivities');
var router = express.Router();


// Display the main logging page
router.get('/', function(req, res, next) {
  var cookieToken = req.cookies.accessToken;
  // Check the user credentials
  login(cookieToken).then(function(results) {
    if (!results.logIn) {
      console.log('user not logged in at index. Redirecting to login...');
      res.redirect('/loginUser');
    } else {

      // Check to see if an update is required
      var updateFlag = req.session.dataUpdate;
      var firstUpdateFlag = req.cookies.dataUpdate;
      console.log('firstUpdateFlag: ', firstUpdateFlag);
      if ((updateFlag) || (firstUpdateFlag)) {
        console.log('dataUpdate exists, must update');
        var shouldUpdate = true;
      } else {
        console.log('dataUpdate does not exist. No update needed.');
        var shouldUpdate = false;
      }
      req.session.dataUpdate = null;
      res.clearCookie('dataUpdate');
      
      if (shouldUpdate) {

        // Get the necessary information
        var blockStart = Date.now();
        Promise.all([
          checkForNormal(results.userID),
          getRoutineTypes(),
          getWeekActivities(results.userID, 0),
          getAllNormals(results.userID),
          getAllActivities(results.userID)
        ])
        .then((values) => {
          var blockEnd = Date.now();
          console.log(`update logPage Promise.all() execution time: ${blockEnd - blockStart} ms`)

          var scheduleExists = values[0].scheduleExists;
           var routineTypes = values[1];
          var dateList = values[2].dateList;
          var allNormals = JSON.stringify(values[3]);
          var allActivities = JSON.stringify(values[4]);
          var routineDict = JSON.stringify(values[2].routineDict);

          if (scheduleExists) { 

            var prevDay = "decrementDate()";
            var nextDay = "incrementDate()";
  
            res.render('logActivity', {
              title: 'Welcome user '+ results.userID, 
              user: results.userID,
              routineTypes: JSON.stringify(routineTypes),
              dateList: JSON.stringify(dateList),
              routineDict: routineDict,
              prevDay: prevDay,
              nextDay: nextDay,
              allNormals: allNormals,
              allActivities: allActivities,
              update: shouldUpdate
            })
  
            
          } else {
            // User has no normal schedule - redirect to newSchedule form
            console.log('schedule does not exist');
            Promise.all([
              getTechniques(),
              getDurations(),
              getAdjuncts(),
              getAdjunctTimes(),
              getFrequencies()
            ])
            .then((values) => {
              var techniques = values[0];
              var durations = values[1];
              var adjuncts = values[2];
              var adjunctTimes = values[3];
              var frequencies = values[4];
  
              res.render('newSchedule', {
                title: 'Welcome! What\'s your normal airway clearance routine?', 
                user: results.userID, 
                techniques: JSON.stringify(techniques),
                durations: JSON.stringify(durations),
                adjuncts: JSON.stringify(adjuncts),
                adjunctTimes: JSON.stringify(adjunctTimes),
                frequencies: JSON.stringify(frequencies),
                chosenDate: false,
                activityType: false,
                saveAsNormal: true,
                sched: false
              })
            })
          }


        })

      } else {

        // Get minimum information necessaary
        var blockStart = Date.now();
        Promise.all([
          checkForNormal(results.userID),
          getRoutineTypes(),
          getWeekActivities(results.userID, 0)
        ])
        .then((values) => {
          var blockEnd = Date.now();
          console.log(`non-update logPage Promise.all() execution time: ${blockEnd - blockStart} ms`)

          var scheduleExists = values[0].scheduleExists;
          var routineTypes = values[1];
          var dateList = JSON.stringify(values[2].dateList);
          var allNormals = false;
          var allActivities = false;
          var routineDict = JSON.stringify(values[2].routineDict);

          if (scheduleExists) { 

            var prevDay = "decrementDate()";
            var nextDay = "incrementDate()";
  
            res.render('logActivity', {
              title: 'Welcome user '+ results.userID, 
              user: results.userID,
              routineTypes: JSON.stringify(routineTypes),
              dateList: dateList,
              routineDict: routineDict,
              prevDay: prevDay,
              nextDay: nextDay,
              allNormals: allNormals,
              allActivities: allActivities,
              update: shouldUpdate
            })
  
            
          } else {
            console.log('schedule does not exist');
            // User has no saved schedule - redirect to newSchedule form
            Promise.all([
              getTechniques(),
              getDurations(),
              getAdjuncts(),
              getAdjunctTimes(),
              getFrequencies()
            ])
            .then((values) => {
              var techniques = values[0];
              var durations = values[1];
              var adjuncts = values[2];
              var adjunctTimes = values[3];
              var frequencies = values[4];
  
              res.render('newSchedule', {
                title: 'Welcome! What\'s your normal airway clearance routine?', 
                user: results.userID, 
                techniques: JSON.stringify(techniques),
                durations: JSON.stringify(durations),
                adjuncts: JSON.stringify(adjuncts),
                adjunctTimes: JSON.stringify(adjunctTimes),
                frequencies: JSON.stringify(frequencies),
                chosenDate: false,
                activityType: false,
                saveAsNormal: true,
                sched: false
              })
            })
          }
        })
      }

    }
  })
});


// Receive the schedule form data
router.post('/scheduleData', async function(req, res, next) {
  const scheduleDetails = req.body;

  req.session.chosenDate = null;
  req.session.activityType = null;
  req.session.saveAsNormal = null;

  // save the schedule
  await saveSchedule(scheduleDetails)

  .then(async function(results) {
    req.session.dataUpdate = true;

    // If we're logging an activity...
    if ((Object.keys(scheduleDetails).includes('activityType')) && (Object.keys(scheduleDetails).includes('chosenDate'))) {
      var scheduleID = results[1][0]['LAST_INSERT_ID()'];
      
      // Log the activity
      await logDifferent(scheduleDetails.user, scheduleDetails.chosenDate, scheduleID, scheduleDetails.activityType)
      .then(async function() {

        // Check whether the user needs prompting to edit their schedule
        await promptToEditNormal(scheduleDetails.user) 
        .then(function(promptResults) {
          console.log('setting dataUpdate cookie')
          if (promptResults) {
            res.redirect('/?np=true')
          } else {
            res.redirect('/');
          }
        })
      })

    } else {
      // Not logging an activity, just redirect
      res.redirect('/');
    }
  })
});

// Receive option for logging, take action accordingle
router.post('/logNewActivity', async function(req, res, next) {
  const details = req.body;

  // Log a normal activity
  if (details.activityType == 1) {
    console.log('logging normal activity');
    await logNormal(details.user, details.chosenDate, details.activityType)
    .then(function() {
      console.log('setting dataUpdate cookie');
      req.session.dataUpdate = true;
      res.redirect('/')
    });

    // Log something different
  } else if (details.activityType == 2) {
    req.session.chosenDate = JSON.stringify(details.chosenDate);
    req.session.activityType =  details.activityType;
    req.session.saveAsNormal = false;
    req.session.savedScheds = true;
    res.redirect('/somethingDifferent');
    
    // Log no activities
  } else if (details.activityType == 3) {
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


// Receive 'no activities' form data
router.post('/noActivities', async function(req, res, next) {
  var reasonID = req.body.reasonID;
  var details = JSON.parse(req.body.details);
  await logNoActivities(details.user, details.chosenDate, details.activityType, reasonID)
  .then(function() {
    console.log('setting dataUpdate cookie');
    req.session.dataUpdate = true;
    res.redirect('/')
  })
})

// Paginate through week's activities with dynamic routing
router.get('/w/:offset', function(req, res, next) {
  var offset = req.params.offset;
  if (!(Number.isInteger(parseInt(offset)))) {
    // console.log('incorrect offset');
    res.redirect('/');
  } else {
    var r = req.query.r;
    var cookieToken = req.cookies.accessToken;

    // Check credentials
    login(cookieToken).then(function(results) {
      if (!results.logIn) {
        console.log('user not logged in at index. Redirecting to login...')
        res.redirect('/loginUser');
      } else {

        // Get information needed
        Promise.all([
          checkForNormal(results.userID),
          getRoutineTypes(),
          getWeekActivities(results.userID, parseInt(offset)),

        ])
        .then((values) => {
        
          var routineTypes = values[1];

          var routineDict = JSON.stringify(values[2].routineDict);

          // Reverse the dateList if we're going forwards through time
          if (r) {
            var dateList = values[2].dateList.reverse();
            var prevDay = "incrementDate()";
            var nextDay = "decrementDate()";
          } else {
            var dateList = values[2].dateList;
            var prevDay = "decrementDate()";
            var nextDay = "incrementDate()";
          }

          res.render('logActivity', {
            title: 'Welcome user '+ results.userID, 
            user: results.userID,
            routineTypes: JSON.stringify(routineTypes),
            dateList: JSON.stringify(dateList),
            routineDict: routineDict,
            prevDay: prevDay,
            nextDay: nextDay,
            allNormals: false,
            allActivities: false,
            update: true
          })
        })

      }
    })
  }

})


module.exports = router;
