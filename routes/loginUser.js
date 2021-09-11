var express = require('express');
var router = express.Router();
var login = require('./appDatabase/login');
var userExistsPriv = require('./privDatabase/userExistsPriv');
var userExists = require('./appDatabase/userExists');
const updateToken = require('./appDatabase/updateToken');
const newUser = require('./appDatabase/newUser');


// Display main login page
router.get('/', function (req, res, next) {
    var cookieToken = req.cookies.accessToken;
    // Check the user credentials. If already logged in, redirect to home page
    login(cookieToken)
    .then(function(results) {
        console.log('loginUser results: ', results, '. Rendering sign in...');
        if (!results.logIn) {
            res.render('loginUser', {title: 'CARE4CF'});
        } else {
            res.redirect('/');
        }
    })
});

// Receive login data
router.post('/verify', function(req, res, next) {
    const userDetails = req.body;
    var email = userDetails.email;
    var token = userDetails.token;

    // Check whether user exists in private registration database
    userExistsPriv(email)
    .then(function(results) {
        if (!results.logIn) {
            // User does not exist in private database
            res.redirect('https://care4cf-register.azurewebsites.net/');
        } else {
            // User exists in private database
            console.log('user exists in private database');
            var userID = results.userID;
            userExists(userID)
            .then(async function(userResults) {
                if (userResults.logIn) {
                    console.log('user exists in app database');
                    // User exists in app database
                    await updateToken(token, userID)
                    // Then redirect to index
                    .then(res.redirect('/'));
                    
                } else {
                    // User does not exist in app database
                    console.log('user does not exist in app database. Creating new row...');
                    // Create a new user
                    await newUser(userID)
                    .then(async function() {
                        await updateToken(token, userID)
                    })
                    .then(res.redirect('/'));

                    // Then redirect to index
                }
            })

        }

    })

});

module.exports = router;