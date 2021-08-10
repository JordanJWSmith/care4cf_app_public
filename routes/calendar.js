var express = require('express');
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
                // console.log('activitiesResults: ', activitiesResults);
                res.render('calendar', {
                    title: 'Calendar',
                    activities: JSON.stringify(activitiesResults)
                })
            })
            
        }
    })
})

module.exports = router;