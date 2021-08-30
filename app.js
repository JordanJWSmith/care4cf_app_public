var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var webPush = require('web-push');
var cron = require('node-cron');
var favicon = require('serve-favicon'); 
var compression = require('compression');

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
var sendNotificationRouter = require('./routes/sendNotification');
var saveSubscriptionAPIRouter = require('./routes/saveSubscriptionAPI');
var checkSubscriptionAPIRouter = require('./routes/checkSubscriptionAPI');
var editGamificationAPIRouter = require('./routes/editGamificationAPI');
var adminRouter = require('./routes/admin')

var sendReminder = require('./routes/appDatabase/sendReminder');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

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
app.use('/sendNotification', sendNotificationRouter);
app.use('/saveSubscriptionAPI', saveSubscriptionAPIRouter);
app.use('/checkSubscriptionAPI', checkSubscriptionAPIRouter);
app.use('/editGamificationAPI', editGamificationAPIRouter);
app.use('/admin', adminRouter);



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

app.get('*', function(req, res) {
  res.redirect('https://' + req.headers.host + req.url)
})

const VAPID_PUBLIC_KEY = "BCrvW3Wqnj6Af3rcTamZLtzMvJX0gMCQLvmemsPQ9fruTTIFsQGoODQ1Zjn-6TRrV9bUtkpQAPQFSDQwSFGBnKg"
const VAPID_PRIVATE_KEY = "ZnA0fY9H320xTpzTCWck1XJAbE9s9gTQ5ljOtoQq9eY";

process.env.VAPID_PUBLIC_KEY = VAPID_PUBLIC_KEY;
process.env.VAPID_PRIVATE_KEY = VAPID_PRIVATE_KEY;


webPush.setGCMAPIKey('AIzaSyBjJ9i9OfBGzplXujpb-ft_452zF17BIjc');
webPush.setVapidDetails(
  'mailto:jordan.smith.20@ucl.ac.uk',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

cron.schedule('0 20 * * *', function() {
  sendReminder()
  .then(function(results) {
    console.log('sent ', results);
  })
})


module.exports = app;
