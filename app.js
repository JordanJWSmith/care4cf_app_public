var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const webPush = require('web-push');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var buttonsRouter = require('./routes/buttons');
var loginUserRouter = require('./routes/loginUser');
var somethingDifferentRouter = require('./routes/somethingDifferent');
var normalRoutineRouter = require('./routes/normalRoutine');
var myRoutinesRouter = require('./routes/myRoutines');
var newScheduleRouter = require('./routes/newSchedule');
var logFromRoutinesRouter = require('./routes/logFromRoutines');
var calendarRouter = require('./routes/calendar');
var vapidPublicKeyRouter = require('./routes/vapidPublicKey');
var registerRouter = require('./routes/register');
// var sendNotificationRouter = require('./routes/sendNotification');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/buttons', buttonsRouter);
app.use('/loginUser', loginUserRouter);
app.use('/somethingDifferent', somethingDifferentRouter);
app.use('/normalRoutine', normalRoutineRouter);
app.use('/myRoutines', myRoutinesRouter);
app.use('/newSchedule', newScheduleRouter);
app.use('/logFromRoutines', logFromRoutinesRouter);
app.use('/calendar', calendarRouter);
app.use('/vapidPublicKey', vapidPublicKeyRouter);
app.use('/register', registerRouter);
// app.use('/sendNotification', sendNotificationRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// console.log(webPush.generateVAPIDKeys()); 
// process.env.VAPID_PUBLIC_KEY = '';
// if (process.env.VAPID_PUBLIC_KEY) {
//   console.log('exist');
// }
// console.log(process.env)

if ((!process.env.VAPID_PUBLIC_KEY) || (!process.env.VAPID_PRIVATE_KEY)) {
  // console.log('does not exist');
  const VAPID_PUBLIC_KEY = webPush.generateVAPIDKeys().publicKey;
  const VAPID_PRIVATE_KEY = webPush.generateVAPIDKeys().privateKey;
  process.env.VAPID_PUBLIC_KEY = VAPID_PUBLIC_KEY;
  process.env.VAPID_PRIVATE_KEY = VAPID_PRIVATE_KEY;
}

webPush.setVapidDetails(
  'https://serviceworke.rs/',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// app.use(function(app, route) {
//   app.get(route + 'vapidPublicKey', function(req, res) {
//     res.send(process.env.VAPID_PUBLIC_KEY);
//   })
// })



// if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
//   console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY "+
//     "environment variables. You can use the following ones:");
//   console.log(webPush.generateVAPIDKeys());
//   return;
// }

// const VAPID_PUBLIC_KEY = webPush.generateVAPIDKeys().publicKey;
// const VAPID_PRIVATE_KEY = webPush.generateVAPIDKeys().privateKey;

// // Set the keys used for encrypting the push messages.
// webPush.setVapidDetails(
//   'https://serviceworke.rs/',
//   process.env.VAPID_PUBLIC_KEY,
//   process.env.VAPID_PRIVATE_KEY
// );

module.exports = app;
