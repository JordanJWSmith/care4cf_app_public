var express = require('express');
var router = express.Router();
var login = require('./appDatabase/login');
const getTechniques = require('./appDatabase/getTechniques');
const getDurations = require('./appDatabase/getDurations');
const getAdjuncts = require('./appDatabase/getAdjuncts');
const getAdjunctTimes = require('./appDatabase/getAdjunctTimes');
const getFrequencies = require('./appDatabase/getFrequencies');

router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
            console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
        } else {

            Promise.all([
                getTechniques(),
                getDurations(),
                getAdjuncts(),
                getAdjunctTimes(),
                getFrequencies()
              ])
              .then((values) => {
                // console.log('promise values for new user: ', values);
                var techniques = values[0];
                var durations = values[1];
                var adjuncts = values[2];
                var adjunctTimes = values[3];
                var frequencies = values[4];
    
                res.render('newSchedule', {
                  title: 'What\'s your routine?', 
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

            // getTechniques()
            // .then(function(techResults) {
            //     getDurations()
            //     .then(function(durationResults) {
            //     getAdjuncts()
            //     .then(function(adjunctResults) {
            //         getAdjunctTimes()
            //         .then(function(adjunctTimeResults) {
            //         getFrequencies()
            //         .then(function(frequencyResults) {

            //             res.render('newSchedule', {
            //             title: 'What\'s your routine?', 
            //             user: results.userID, 
            //             techniques: JSON.stringify(techResults),
            //             durations: JSON.stringify(durationResults),
            //             adjuncts: JSON.stringify(adjunctResults),
            //             adjunctTimes: JSON.stringify(adjunctTimeResults),
            //             frequencies: JSON.stringify(frequencyResults),
            //             chosenDate: false,
            //             activityType: false,
            //             saveAsNormal: true,
            //             sched: false
            //             })
            //         })
                    
            //         })
                    
            //     })
                
            //     })
                
            // })
        }
    })
})

module.exports = router;