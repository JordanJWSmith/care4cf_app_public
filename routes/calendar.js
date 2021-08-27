var express = require('express');
const getActivityDates = require('./appDatabase/getActivityDates');
const getAllActivities = require('./appDatabase/getAllActivities');
const getGamifSettings = require('./appDatabase/getGamifSettings');
var router = express.Router();
const login = require('./appDatabase/login');


router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
          console.log('user not logged in at index. Redirecting to login...')
          res.redirect('/loginUser');
        } else {
            
            var userID = results.userID;

            // var start = Date.now();
            // Promise.all([
            //     getActivityDates(userID),
            //     getGamifSettings(userID)
            // ])
            // .then((values) => {
            //     console.log('promise values: ', values);
            // })
            // .then(function() {
            //     var end = Date.now();
            //     console.log(`Promise.all() execution time: ${end - start} ms`)
            // })
            
            

            // getAllActivities(userID)
            // .then(function(activitiesResults) {
                var chainStart = Date.now();
                getActivityDates(userID)
                .then(function(streakResults) {
                    // console.log('streakResults: ', streakResults)
                    getGamifSettings(userID)
                    .then(function(gamifResults) {
                        var chainEnd = Date.now();
                        console.log(`Promise chain execution time: ${chainEnd - chainStart} ms`);
                        // console.log('gamif Results: ', parseInt(gamifResults));
                        // if (parseInt(gamifResults)) {
                        //     console.log('gamification active')
                        // } else {
                        //     console.log('gamification inactive')
                        // }
                        res.render('calendar', {
                            title: 'My History',
                            // activities: JSON.stringify(activitiesResults),
                            currentStreak: streakResults.currentStreak,
                            longestStreak: streakResults.longestStreak,
                            gamification: parseInt(gamifResults),
                            userID: userID
                        })
                    })
                    
                })
                // console.log('activitiesResults: ', activitiesResults);
                
            // })
            
        } 
    })
})

module.exports = router;