var express = require('express');
const login = require('./appDatabase/login');
const checkForNormal = require('./appDatabase/checkForNormal')
const getTechniques = require('./appDatabase/getTechniques')
var router = express.Router();


router.get('/', function(req, res, next) {
  var cookieToken = req.cookies.accessToken;
  login(cookieToken).then(function(results) {
    if (!results.logIn) {
      console.log('user not logged in at index. Redirecting to login...')
      res.redirect('/loginUser');
    } else {
      checkForNormal(results.userID)
      .then(function(checkResults) {
        if (checkResults.scheduleExists) {
          res.render('index', {title: 'Welcome user '+ results.userID})
        } else {
          getTechniques()
          .then(function(techResults) {
            // console.log(results);
            res.render('newSchedule', {title: 'Welcome, user ' + results.userID +'.', user: results.userID, techniques: JSON.stringify(techResults)})
          })
            
        }
      })
      
    }
  })
  // res.render('index', {title: 'Welcome'});
});
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   // console.log('cookies: ', req.cookies.login);
//   res.render('index', { title: 'Express - Jordan' });
// });



module.exports = router;
