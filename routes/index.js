var express = require('express');
var session = require('express-session');
// var pushpad = require('pushpad');
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
// const getRoutine = require('./appDatabase/getRoutine');
// const checkForDate = require('./appDatabase/checkForDate');
const getWeekActivities = require('./appDatabase/getWeekActivities');
const promptToEditNormal = require('./appDatabase/promptToEditNormal');
const getAllNormals = require('./appDatabase/getAllNormals');
const getAllActivities = require('./appDatabase/getAllActivities');
var router = express.Router();



router.get('/', function(req, res, next) {
  var cookieToken = req.cookies.accessToken;
  // console.log('integerCheck:', Number.isInteger(parseInt('5')));
  login(cookieToken).then(function(results) {
    if (!results.logIn) {
      console.log('user not logged in at index. Redirecting to login...');
      res.redirect('/loginUser');
    } else {

      var updateFlag = req.session.dataUpdate;
      var firstUpdateFlag = req.cookies.dataUpdate;
      console.log('firstUpdateFlag: ', firstUpdateFlag);

      if ((updateFlag) || (firstUpdateFlag)) {
        console.log('dataUpdate exists, must update');
        var shouldUpdate = true;
      } else {
        console.log('dataUpdate does not exist. No update needed.');
        var shouldUpdate = false;
        // var shouldUpdate = true;
      }

      req.session.dataUpdate = null;
      // req.cookies.dataUpdate = "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
      res.clearCookie('dataUpdate');

      // var scheduleExists, routineTypes, dateList, allNormals, allActivities, routineDict;

      
      if (shouldUpdate) {

        var blockStart = Date.now();
        Promise.all([
          checkForNormal(results.userID),
          getRoutineTypes(),
          getWeekActivities(results.userID, 0),
          getAllNormals(results.userID),
          getAllActivities(results.userID)
        ])
        .then((values) => {
          // console.log('update values: ', values)
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

        var blockStart = Date.now();
        Promise.all([
          checkForNormal(results.userID),
          getRoutineTypes(),
          getWeekActivities(results.userID, 0)
        ])
        .then((values) => {
          // console.log('non-update vaalues: ', values)
          var blockEnd = Date.now();
          console.log(`non-update logPage Promise.all() execution time: ${blockEnd - blockStart} ms`)

          var scheduleExists = values[0].scheduleExists;
          var routineTypes = values[1];
          var dateList = JSON.stringify(values[2].dateList);
          // var dateList = false;
          var allNormals = false;
          var allActivities = false;
          var routineDict = JSON.stringify(values[2].routineDict);
          // var routineDict = false;

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

        // scheduleExists = values[0].scheduleExists;

        // if (scheduleExists) { 

        //   var prevDay = "decrementDate()";
        //   var nextDay = "incrementDate()";

        //   res.render('logActivity', {
        //     title: 'Welcome user '+ results.userID, 
        //     user: results.userID,
        //     routineTypes: JSON.stringify(routineTypes),
        //     dateList: JSON.stringify(dateList),
        //     routineDict: routineDict,
        //     prevDay: prevDay,
        //     nextDay: nextDay,
        //     allNormals: allNormals,
        //     allActivities: allActivities,
        //     update: shouldUpdate
        //   })

          
        // } else {
        //   console.log('schedule does not exist');
        //   Promise.all([
        //     getTechniques(),
        //     getDurations(),
        //     getAdjuncts(),
        //     getAdjunctTimes(),
        //     getFrequencies()
        //   ])
        //   .then((values) => {
        //     var techniques = values[0];
        //     var durations = values[1];
        //     var adjuncts = values[2];
        //     var adjunctTimes = values[3];
        //     var frequencies = values[4];

        //     res.render('newSchedule', {
        //       title: 'Welcome! What\'s your normal airway clearance routine?', 
        //       user: results.userID, 
        //       techniques: JSON.stringify(techniques),
        //       durations: JSON.stringify(durations),
        //       adjuncts: JSON.stringify(adjuncts),
        //       adjunctTimes: JSON.stringify(adjunctTimes),
        //       frequencies: JSON.stringify(frequencies),
        //       chosenDate: false,
        //       activityType: false,
        //       saveAsNormal: true,
        //       sched: false
        //     })
        //   })
        // }
      // })
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
    req.session.dataUpdate = true;

    if ((Object.keys(scheduleDetails).includes('activityType')) && (Object.keys(scheduleDetails).includes('chosenDate'))) {
      // console.log('index schedID: ', results[1][0]['LAST_INSERT_ID()']);
      var scheduleID = results[1][0]['LAST_INSERT_ID()'];
      
      await logDifferent(scheduleDetails.user, scheduleDetails.chosenDate, scheduleID, scheduleDetails.activityType)
      .then(async function() {
        await promptToEditNormal(scheduleDetails.user) 
        .then(function(promptResults) {
          console.log('setting dataUpdate cookie')
          // changeCookie here
          if (promptResults) {
            res.redirect('/?np=true')
          } else {
            res.redirect('/');
          }
        })
      })
      // res.redirect('/')
      // .then(res.redirect('/'))
    } else {
      res.redirect('/');
    }
  })
});


router.post('/logNewActivity', async function(req, res, next) {
  const details = req.body;
  // console.log('activity type: ', details.activityType);
  // console.log('(index) date: ', details.chosenDate, typeof details.chosenDate);
  // console.log('user: ', details.user);

  if (details.activityType == 1) {
    console.log('logging normal activity');
    await logNormal(details.user, details.chosenDate, details.activityType)
    .then(function() {
      console.log('setting dataUpdate cookie');
      req.session.dataUpdate = true;
      res.redirect('/')
    });
    // changeCookie here

  } else if (details.activityType == 2) {
    // console.log('logging something different');
    req.session.chosenDate = JSON.stringify(details.chosenDate);
    req.session.activityType =  details.activityType;
    req.session.saveAsNormal = false;
    req.session.savedScheds = true;
    res.redirect('/somethingDifferent');
    
  } else if (details.activityType == 3) {
    // console.log('logging no activities');
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
  // changeCookie here
  await logNoActivities(details.user, details.chosenDate, details.activityType, reasonID)
  .then(function() {
    console.log('setting dataUpdate cookie');
    req.session.dataUpdate = true;
    res.redirect('/')
  })
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

        Promise.all([
          checkForNormal(results.userID),
          getRoutineTypes(),
          getWeekActivities(results.userID, parseInt(offset)),
          // getAllNormals(results.userID),
          // getAllActivities(results.userID)
        ])
        .then((values) => {
          // console.log('blockPromise values: ', values)
        
          var routineTypes = values[1];
          // var weekActivities = values[2].routine;
          // var dateList = values[2].dateList;
          // var startDate = values[2].startDate;
          var routineDict = JSON.stringify(values[2].routineDict);
          // var allNormals = JSON.stringify(values[3]);
          // var allActivities = JSON.stringify(values[4]);

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
            // weekActivities: JSON.stringify(weekResults.routine),
            dateList: JSON.stringify(dateList),
            // startDate: JSON.stringify(weekResults.startDate),
            routineDict: routineDict,
            prevDay: prevDay,
            nextDay: nextDay,
            allNormals: false,
            allActivities: false,
            update: true
          })
        })

        // checkForNormal(results.userID)
        // .then(function(checkResults) {
        //   if (checkResults.scheduleExists) {
        //     getRoutineTypes()
        //     .then(function(routineResults) {
        //       getWeekActivities(results.userID, parseInt(offset))
        //         .then(function(weekResults) {
        //           getAllNormals(results.userID)
        //         .then(function(allNormalsResults) {
        //           getAllActivities(results.userID)
        //           .then(function(allActivitiesResults){
        //             // console.log('weekResults: ', weekResults);
        //             if (r) {
        //               // console.log('r true');
        //               var dateList = weekResults.dateList.reverse()
        //               var prevDay = "incrementDate()";
        //               var nextDay = "decrementDate()";
                      
        //             } else {
        //               var dateList = weekResults.dateList
        //               var prevDay = "decrementDate()";
        //               var nextDay = "incrementDate()";
        //             }

        //             res.render('logActivity', {
        //               title: 'Welcome user '+ results.userID, 
        //               user: results.userID,
        //               routineTypes: JSON.stringify(routineResults),
        //               weekActivities: JSON.stringify(weekResults.routine),
        //               dateList: JSON.stringify(dateList),
        //               startDate: JSON.stringify(weekResults.startDate),
        //               routineDict: JSON.stringify(weekResults.routineDict),
        //               prevDay: prevDay,
        //               nextDay: nextDay,
        //               allNormals: JSON.stringify(allNormalsResults),
        //               allActivities: JSON.stringify(allActivitiesResults)
        //               })
        //           })
        //         })
        //       })
        //     })
        //   }
        // })
      }
    })
  }

})


module.exports = router;
