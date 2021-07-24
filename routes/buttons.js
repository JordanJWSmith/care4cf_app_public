var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');



// /* GET buttons page. */
// router.get('/', function(req, res, next) {
// //   console.log('cookies: ', req.cookies);
// //   console.log(Object.keys(req.cookies));
// //   console.log(Object.keys(req.cookies).includes('msal.idtoken'));
//   var cookieArray = Object.keys(req.cookies);
//   var logIn = (cookieArray.includes('loginID'));
//   if (logIn) {
//     res.render('buttons', { title: 'Only Accessible via login', logIn: logIn });
//   } else {
//     res.redirect('/');
//   }

  
// //   console.log(cookieParser.JSONCookies(req.cookies));
// //   console.log((cookieParser.JSONCookies(req.cookies) == req.cookies));
  

// });



module.exports = router;
