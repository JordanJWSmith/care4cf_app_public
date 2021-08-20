var express = require('express');
const getActivityDates = require('./appDatabase/getActivityDates');
const getAllActivities = require('./appDatabase/getAllActivities');
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
            userID = results.userID;
            getAllActivities(userID)
            .then(function(activitiesResults) {
                getActivityDates(userID)
                .then(function(streakResults) {
                    console.log('streakResults: ', streakResults)
                    res.render('calendar', {
                        title: 'My History',
                        activities: JSON.stringify(activitiesResults),
                        currentStreak: streakResults.currentStreak,
                        longestStreak: streakResults.longestStreak
                    })
                })
                // console.log('activitiesResults: ', activitiesResults);
                
            })
            
        } 
    })
})

module.exports = router;