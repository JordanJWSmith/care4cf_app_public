var express = require('express');
const login = require('./login');
var router = express.Router();


router.get('/', function(req, res, next) {
  var cookieToken = req.cookies.accessToken;
  login(cookieToken).then(function(results) {
    if (!results.logIn) {
      console.log('user not logged in at index. Redirecting to login...')
      res.redirect('/loginUser');
      // res.send('Not logged in')
    } else {
      res.render('index', {title: 'Welcome user '+ results.userID})
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
