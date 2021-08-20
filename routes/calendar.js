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
            getAllActivities(userID)
            .then(function(activitiesResults) {
                getActivityDates(userID)
                .then(function(streakResults) {
                    // console.log('streakResults: ', streakResults)
                    getGamifSettings(userID)
                    .then(function(gamifResults) {
                        // console.log('gamif Results: ', parseInt(gamifResults));
                        // if (parseInt(gamifResults)) {
                        //     console.log('gamification active')
                        // } else {
                        //     console.log('gamification inactive')
                        // }
                        res.render('calendar', {
                            title: 'My History',
                            activities: JSON.stringify(activitiesResults),
                            currentStreak: streakResults.currentStreak,
                            longestStreak: streakResults.longestStreak,
                            gamification: parseInt(gamifResults),
                            userID: userID
                        })
                    })
                    
                })
                // console.log('activitiesResults: ', activitiesResults);
                
            })
            
        } 
    })
})

module.exports = router;