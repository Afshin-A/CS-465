// importing node modules as variables
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
// Define handlabars constiable
const handlebars = require('hbs');

const app = express();

// view engine setup
// __dirname is an environment variable in node.js that tells you the absolute path of the directory containing the currently executing file.
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials
// handlebars.registerPartials('myPartial', './app_server/views/partials');
handlebars.registerPartials(__dirname + "/app_server/views/partials");

app.set('view engine', 'hbs');

// middleware - asynchronous
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parses out any of the cookie information, and attaches the data to the request in a way that
// makes it easy to reference in the controller code.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// matching request against a route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);

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
