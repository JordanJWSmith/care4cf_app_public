var express = require('express');
const login = require('./appDatabase/login')
const getEmailPriv = require('./privDatabase/getEmailPriv');
const checkAdmin = require('./appDatabase/checkAdmin');
var router = express.Router();



router.get('/', function(req, res, next) {
    var cookieToken = req.cookies.accessToken;
    login(cookieToken).then(function(results) {
        if (!results.logIn) {
            // console.log('user not logged in at index. Redirecting to login...')
            res.redirect('/loginUser');
        } else {
            checkAdmin(results.userID)
            .then(function(adminResults) {
                // console.log('adminResults: ', adminResults)
                if (adminResults) {
                    // console.log('emaail: ', results)
                    res.render('admin', {title: 'Admin Page'});
                }
                else {
                    // alert("You don't have permission to access this page");
                    res.redirect('/');
                }
                
            })
            
        }
    })
});

module.exports = router;
