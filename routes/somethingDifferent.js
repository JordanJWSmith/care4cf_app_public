var express = require('express');
var session = require('express-session');
var router = express.Router();
var login = require('./appDatabase/login');
const getTechniques = require('./appDatabase/getTechniques');
const getDurations = require('./appDatabase/getDurations');
const getAdjuncts = require('./appDatabase/getAdjuncts');
const getAdjunctTimes = require('./appDatabase/getAdjunctTimes');
const getFrequencies = require('./appDatabase/getFrequencies');


router.get('/', function (req, res, next) {
    var chosenDate = req.session.chosenDate;
    var activityType = req.session.activityType;
    var saveAsNormal = req.session.saveAsNormal;
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
                            res.render('newSchedule', 
                        {title: 'What activities did you do?', 
                        user: results.userID, 
                        techniques: JSON.stringify(techResults),
                        durations: JSON.stringify(durationResults),
                        adjuncts: JSON.stringify(adjunctResults),
                        adjunctTimes: JSON.stringify(adjunctTimeResults),
                        frequencies: JSON.stringify(frequencyResults),
                        chosenDate: chosenDate,
                        activityType: activityType,
                        saveAsNormal: saveAsNormal
                        })
                        
                        })
                    })
                    
                })
                
                })
                // console.log(results);
                
            })
            // res.render('newSchedule', {title: 'What airway clearance did you do?'});
        }
    })
});

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