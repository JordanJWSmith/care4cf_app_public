var express = require('express');
const getNormalRoutine = require('./appDatabase/getNormalRoutine');
var router = express.Router();
var login = require('./appDatabase/login');

router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
            console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
        } else {
            getNormalRoutine(results.userID)
            .then(function(routineResults) {
                // console.log(routineResults);

                res.render('normalRoutine', {
                    title: 'My Routine', 
                    user: results.userID,
                    techniques: routineResults.techniques,
                    duration: routineResults.duration,
                    frequency: routineResults.frequency,
                    adjuncts: routineResults.adjuncts
                    // adjuncts: false
                })
            })
                
                
            
        }
    })
})

module.exports = router;