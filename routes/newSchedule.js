var express = require('express');
var router = express.Router();
var login = require('./appDatabase/login');
const getTechniques = require('./appDatabase/getTechniques');
const getDurations = require('./appDatabase/getDurations');
const getAdjuncts = require('./appDatabase/getAdjuncts');
const getAdjunctTimes = require('./appDatabase/getAdjunctTimes');
const getFrequencies = require('./appDatabase/getFrequencies');

// Display the newSchedule form
router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    // Check user credentials
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
            console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
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

        }
    })
})

module.exports = router;