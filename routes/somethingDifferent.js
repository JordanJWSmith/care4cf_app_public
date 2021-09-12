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

// Display the MyRoutines page to allow users to log one of their saved schedules
router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    var chosenDate = req.session.chosenDate;
    var activityType = req.session.activityType;

    // Check user credentials
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
            console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
        } else {

            Promise.all([
                getNormalSchedID(results.userID),
                getAllNormals(results.userID)
            ])
            .then((values) =>  {
                promptToEditNormal(results.userID)
                .then(function(promptResults) {
                    var normalSched = values[0].results[0].scheduleID;
                    var allNormals = values[1];

                    res.render('myRoutines', {
                        title: 'Which activities did you do?',
                        normalSched: normalSched,
                        normalRoutines: JSON.stringify(allNormals),
                        user: results.userID,
                        chosenDate: chosenDate,
                        activityType: activityType,
                        somethingDifferent: true,
                        prompt: promptResults
                    })
                })
            })

                // // Get the user's normal schedule
                // getNormalSchedID(results.userID)
                // .then(function(normalSchedIDResult) {

                //     // See if the user needs prompting to update normal schedule
                //     promptToEditNormal(results.userID)
                //     .then(function(promptResults) {
                //         var normalSched = normalSchedIDResult.results[0].scheduleID;
                //         res.render('myRoutines', {
                //             title: 'Which activities did you do?',
                //             normalSched: normalSched,
                //             user: results.userID,
                //             chosenDate: chosenDate,
                //             activityType: activityType,
                //             somethingDifferent: true,
                //             prompt: promptResults
                //         })
                //     })
                   
                // })                
            // })           
        }
    })
})

// Display newSchedule form to log a new activity
router.get('/logNew', function (req, res, next) {
    var chosenDate = req.session.chosenDate;
    var activityType = req.session.activityType;
    var saveAsNormal = req.session.saveAsNormal;
    var savedScheds = req.session.savedScheds;

    if (savedScheds) {
        var sched = true;
    } else {
        var sched = false;
    }
 
    var cookieToken = req.cookies.accessToken;
  
    // Check user credentials
    login(cookieToken)
    .then(function(results) {
        console.log('loginUser results: ', results, '. Rendering sign in...');
        if (!results.logIn) {
            res.render('loginUser', {title: 'Please sign in'});
        } else {

            // Get necessary information
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

        }
    })
});


// Receive logging information and save in DB
router.post('/logActivity', async function(req, res, next) {
    var details = req.body;
    var chosenDate = req.body.chosenDate;
    var userID = req.body.userID;
    var scheduleID = req.body.scheduleID;
    
    // Log the activity
    await logDifferent(userID, chosenDate, scheduleID, 2)
    .then(async function() {

        // See if the user needs prompting to update their normal
        await promptToEditNormal(userID)
        .then(function(promptResults) {
            req.session.dataUpdate = true;
            if (promptResults) {
                res.redirect('/?np=true')
            } else {
                res.redirect('/');
            }
        })
    })
  
  })



module.exports = router;