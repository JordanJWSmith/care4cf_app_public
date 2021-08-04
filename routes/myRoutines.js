var express = require('express');
const getAllNormals = require('./appDatabase/getAllNormals');
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
            getAllNormals(results.userID)
            .then(function(allNormalsResults) {
                res.render('myRoutines', {
                    title: 'My Routines',
                    routines: JSON.stringify(allNormalsResults)
                })
            })           
        }
    })
})

module.exports = router;