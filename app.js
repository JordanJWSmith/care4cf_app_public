var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var buttonsRouter = require('./routes/buttons');
var loginUserRouter = require('./routes/loginUser');
var somethingDifferentRouter = require('./routes/somethingDifferent');
var normalRoutineRouter = require('./routes/normalRoutine');
var myRoutinesRouter = require('./routes/myRoutines');
var newScheduleRouter = require('./routes/newSchedule');

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

module.exports = app;
