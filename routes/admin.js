var express = require('express');
const login = require('./appDatabase/login')
const getEmailPriv = require('./privDatabase/getEmailPriv');
const checkAdmin = require('./appDatabase/checkAdmin');
var router = express.Router();


// Display the admin page
router.get('/', function(req, res, next) {
    var cookieToken = req.cookies.accessToken;
    // Check the users credentials
    login(cookieToken).then(function(results) {
        if (!results.logIn) {
            res.redirect('/loginUser');
        } else {
            // Check the user is listed as admin
            checkAdmin(results.userID)
            .then(function(adminResults) {
                if (adminResults) {
                    res.render('admin', {title: 'Admin Page'});
                }
                else {
                    res.redirect('/');
                }
                
            })
            
        }
    })
});

module.exports = router;
