var express = require('express');
const getAllNormals = require('./appDatabase/getAllNormals');
const getNormalSchedID = require('./appDatabase/getNormalSchedID');
var router = express.Router();
var login = require('./appDatabase/login');
const makeNormal = require('./appDatabase/makeNormal');

router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    login(cookieToken)
    .then(function(results) {
        if (!results.logIn) {
            console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
        } else {
            getAllNormals(results.userID)
            .then(function(allNormalsResults) {
                getNormalSchedID(results.userID)
                .then(function(normalSchedIDResult) {
                    // var normalSched = normalSchedIDResult[0].scheduleID;
                    // console.log(normalSched);
                    // console.log('normal ID: ', normalSchedIDResult.results[0].scheduleID);
                    var normalSched = normalSchedIDResult.results[0].scheduleID;
                    // res.render('myRoutines', {
                        res.render('myRoutines', {
                        title: 'Routines',
                        routines: JSON.stringify(allNormalsResults),
                        normalSched: normalSched,
                        user: results.userID,
                        somethingDifferent: false
                    })
                })                
            })           
        }
    })
})

router.post('/newNormal', async function(req, res, next) {
    var details = req.body;
    console.log('detials: ', details);
    var user = details.user;
    var schedID = details.scheduleID;
    await makeNormal(user, schedID)
    .then(function() {
        res.redirect('/myRoutines');
    })
    // res.send(details);
})

module.exports = router;