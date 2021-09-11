var express = require('express');
const getAllNormals = require('./appDatabase/getAllNormals');
const getNormalSchedID = require('./appDatabase/getNormalSchedID');
var router = express.Router();
var login = require('./appDatabase/login');
const makeNormal = require('./appDatabase/makeNormal');

// Display the My Routines page
router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    // Check user credentials
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
            console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
        } else {

                // Find their normal schedule
                getNormalSchedID(results.userID)
                .then(function(normalSchedIDResult) {

                    var normalSched = normalSchedIDResult.results[0].scheduleID;
                    res.render('myRoutines', {
                        title: 'Routines',
                        normalSched: normalSched,
                        user: results.userID,
                        somethingDifferent: false
                    })
                })                
        }
    })
})

// Receive data to change normal schedule
router.post('/newNormal', async function(req, res, next) {
    var details = req.body;
    console.log('detials: ', details);
    var user = details.user;
    var schedID = details.scheduleID;
    await makeNormal(user, schedID)
    .then(function() {
        res.redirect('/myRoutines');
    })
})

module.exports = router;