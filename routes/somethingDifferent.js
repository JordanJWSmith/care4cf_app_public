var express = require('express');
var session = require('express-session');
var router = express.Router();
var login = require('./appDatabase/login');
const getTechniques = require('./appDatabase/getTechniques');
const getDurations = require('./appDatabase/getDurations');
const getAdjuncts = require('./appDatabase/getAdjuncts');
const getAdjunctTimes = require('./appDatabase/getAdjunctTimes');
const getFrequencies = require('./appDatabase/getFrequencies');
const getAllNormals = require('./appDatabase/getAllNormals');
const getNormalSchedID = require('./appDatabase/getNormalSchedID');
const logDifferent = require('./appDatabase/logDifferent');
const promptToEditNormal = require('./appDatabase/promptToEditNormal');


router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    var chosenDate = req.session.chosenDate;
    var activityType = req.session.activityType;
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
            console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
        } else {
            // getAllNormals(results.userID)
            // .then(function(allNormalsResults) {
                getNormalSchedID(results.userID)
                .then(function(normalSchedIDResult) {
                    promptToEditNormal(results.userID)
                    .then(function(promptResults) {
                        console.log('promptResults: ', promptResults);
                         // var normalSched = normalSchedIDResult[0].scheduleID;
                    // console.log(normalSched);
                    // console.log('normal ID: ', normalSchedIDResult.results[0].scheduleID);
                        var normalSched = normalSchedIDResult.results[0].scheduleID;
                        // console.log(chosenDate);
                        res.render('myRoutines', {
                            title: 'Which activities did you do?',
                            // routines: JSON.stringify(allNormalsResults),
                            normalSched: normalSched,
                            user: results.userID,
                            chosenDate: chosenDate,
                            activityType: activityType,
                            somethingDifferent: true,
                            prompt: promptResults
                        })
                    })
                   
                })                
            // })           
        }
    })
})


router.get('/logNew', function (req, res, next) {
    var chosenDate = req.session.chosenDate;
    var activityType = req.session.activityType;
    var saveAsNormal = req.session.saveAsNormal;
    var savedScheds = req.session.savedScheds;
    // console.log('savedScheds:' , savedScheds);

    // USE THIS AS FLAG TO RENDER SAVED SCHEDULE OPTIONS
    if (savedScheds) {
        console.log('savedScheds:' , savedScheds);
        var sched = true;
    } else {
        console.log('No savedScheds:' , savedScheds);
        var sched = false;
    }
    // req.session.chosenDate = null;
    // req.session.activityType = null;
    // req.session.saveAsNormal = null;
    var cookieToken = req.cookies.accessToken;
    // console.log('date:', chosenDate);
    // console.log('activityType:', activityType);
    // console.log('saveAsNormal:', saveAsNormal);
    login(cookieToken)
    .then(function(results) {
        console.log('loginUser results: ', results, '. Rendering sign in...');
        if (!results.logIn) {
            res.render('loginUser', {title: 'Please sign in'});
        } else {

            Promise.all([
                getTechniques(),
                getDurations(),
                getAdjuncts(),
                getAdjunctTimes(),
                getFrequencies()
            ])
            .then((values) => {
                console.log('promiseBlock values: ', values);
                var techniques = values[0];
                var durations = values[1];
                var adjuncts = values[2];
                var adjunctTimes = values[3];
                var frequencies = values[4];

                res.render('newSchedule', {
                    title: 'What activities did you do?',
                    user: results.userID,
                    techniques: JSON.stringify(techniques),
                    durations: JSON.stringify(durations),
                    adjuncts: JSON.stringify(adjuncts),
                    adjunctTimes: JSON.stringify(adjunctTimes),
                    frequencies: JSON.stringify(frequencies),
                    chosenDate: chosenDate,
                    activityType: activityType,
                    saveAsNormal: saveAsNormal,
                    sched: sched

                })

            })


            // getTechniques()
            // .then(function(techResults) {
            //     getDurations()
            //     .then(function(durationResults) {
            //     getAdjuncts()
            //     .then(function(adjunctResults) {
            //         getAdjunctTimes()
            //         .then(function(adjunctTimeResults) {
            //             getFrequencies()
            //             .then(function(frequencyResults) {
            //                 // promptToEditNormal(results.userID)
            //                 // .then(function(promptResults) {
            //                     res.render('newSchedule', 
            //                     // res.render('logFromRoutines', 
            //                     {
            //                         title: 'What activities did you do?', 
            //                         user: results.userID, 
            //                         techniques: JSON.stringify(techResults),
            //                         durations: JSON.stringify(durationResults),
            //                         adjuncts: JSON.stringify(adjunctResults),
            //                         adjunctTimes: JSON.stringify(adjunctTimeResults),
            //                         frequencies: JSON.stringify(frequencyResults),
            //                         chosenDate: chosenDate,
            //                         activityType: activityType,
            //                         saveAsNormal: saveAsNormal,
            //                         sched: sched
            //                     })
            //                 // })
            //             })
            //         })
            //     })
            //     })
            //     // console.log(results); 
            // })
            // res.render('newSchedule', {title: 'What airway clearance did you do?'});
        }
    })
});

router.post('/logActivity', async function(req, res, next) {
    var details = req.body;
    var chosenDate = req.body.chosenDate;
    var userID = req.body.userID;
    var scheduleID = req.body.scheduleID;
    
    // if promptToEditNormal, redirect to myRoutines instead
    await logDifferent(userID, chosenDate, scheduleID, 2)
    .then(async function() {
        await promptToEditNormal(userID)
        .then(function(promptResults) {
            console.log(promptResults)
            if (promptResults) {
                res.redirect('/?np=true')
            } else {
                res.redirect('/');
            }
        })
    })
    // .then(res.redirect('/'));
    // var details = JSON.parse(req.body.details);
    // await logDifferent
    // res.send(details);
  
  })

// router.post('/scheduleData', async function(req, res, next) {
//     // ADD CONTINGENCY FOR (IF ACTIVITYTYPE & CHOSENDATE) {ADD TO ACTIVITIES} 
//     const scheduleDetails = req.body;
//     // console.log('details: ', userDetails);
//     await saveSchedule(scheduleDetails)
//     .then(function(results) {
//         console.log('scheduleID results: ', results)
//     })
//     .then(res.send(scheduleDetails))
//     // res.send(scheduleDetails);
//   });


module.exports = router;