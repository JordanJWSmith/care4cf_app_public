var express = require('express');
var router = express.Router();
var login = require('./login');
var userExistsPriv = require('./userExistsPriv');
var userExists = require('./userExists');
const updateToken = require('./updateToken');
const newUser = require('./newUser');

router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    login(cookieToken)
    .then(function(results) {
        console.log('loginUser results: ', results, '. Rendering sign in...');
        if (!results.logIn) {
            res.render('loginUser', {title: 'Please sign in'});
        } else {
            res.redirect('/');
        }
    })
});


router.post('/verify', function(req, res, next) {
const userDetails = req.body;
var email = userDetails.email;
var token = userDetails.token;

userExistsPriv(email).then(function(results) {
    // console.log(' userExists results (should be false):',  results)
    if (!results.logIn) {
        // User does not exist in private database
        res.send('Redirecting to registration site...');
    } else {
        // User exists in private database
        console.log('user exists in private database');
        userID = results.userID;
        userExists(userID).then(function(userResults) {
            if (userResults.logIn) {
                console.log('user exists in app database');
                // User exists in app database
                // updateToken
                updateToken(token, userID)
                // Then redirect to index
                .then(res.redirect('/'));
                
            } else {
                // User does not exist in app database
                console.log('user does not exist in app database. Creating new row...');
                // createUser
                newUser({userID: userID, msalToken: token}).then(res.redirect('/'));

                // Then redirect to index
            }
        })

    }


    // if (results.logIn) {
    // console.log('Updating token');
    // updateToken(token, email).then(res.redirect('/'));
    // } else {
    // console.log('Create new user');
    // var lName = name.split(",")[0].trim();
    // var fName = name.split(",")[1].trim();
    // res.render('users', {title: 'Welcome', email: email, lName: lName, fName: fName, token: token});
    // }
})
// userExists().then()if userExists, updateToken and redirect to index.
// if userNotExists, redirect to /new

});

module.exports = router;