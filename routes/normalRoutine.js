var express = require('express');
const getNormalRoutine = require('./appDatabase/getNormalRoutine');
var router = express.Router();
var login = require('./appDatabase/login');

// Display the Normal Routine page
router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    // check user credentials
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
            console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
        } else {

            // Get the user's normal schedule
            getNormalRoutine(results.userID)
            .then(function(routineResults) {

                res.render('normalRoutine', {
                    title: 'My Routine', 
                    user: results.userID,
                    techniques: routineResults.techniques,
                    duration: JSON.stringify(routineResults.duration),
                    frequency: JSON.stringify(routineResults.frequency),
                    adjuncts: routineResults.adjuncts
                })
            })
                
                
            
        }
    })
})

module.exports = router;