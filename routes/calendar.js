var express = require('express');
const getActivityDates = require('./appDatabase/getActivityDates');
const getAllActivities = require('./appDatabase/getAllActivities');
const getGamifSettings = require('./appDatabase/getGamifSettings');
var router = express.Router();
const login = require('./appDatabase/login');

// Display the My History page
router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    // Check user credentials
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
          console.log('user not logged in at index. Redirecting to login...')
          res.redirect('/loginUser');
        } else {

            var updateFlag = req.cookies.dataUpdate;
            var userID = results.userID;

            if (updateFlag) {
                
                req.session.dataUpdate = null;
                res.clearCookie('dataUpdate');
                console.log('calendar update needed')

                Promise.all([
                    getActivityDates(userID),
                    getAllActivities(userID),
                    getGamifSettings(userID)
                ])
                .then((values) => {
                    console.log('values: ', values)
                
                    var currentStreak = values[0].currentStreak;
                    var longestStreak = values[0].longestStreak;
                    var allActivities = values[1];
                    var gamification = values[2];
    
                    res.render('calendar', {
                        title: 'My History',
                        currentStreak: currentStreak,
                        longestStreak: longestStreak,
                        gamification: parseInt(gamification),
                        userID: userID,
                        activities: JSON.stringify(allActivities)
                    })
                })
            } else {
                console.log('no calendar update needed');
                // var userID = results.userID;

                // Get necessary info
                Promise.all([
                    getActivityDates(userID),
                    getGamifSettings(userID)
                ])
                .then((values) => {
                    
                    var currentStreak = values[0].currentStreak;
                    var longestStreak = values[0].longestStreak;
                    var gamification = values[1];

                    res.render('calendar', {
                        title: 'My History',
                        currentStreak: currentStreak,
                        longestStreak: longestStreak,
                        gamification: parseInt(gamification),
                        userID: userID,
                        activities: false
                    })
                })
            }


            
            
            
            
        } 
    })
})

module.exports = router;