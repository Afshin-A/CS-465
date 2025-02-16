// importing node modules as variables
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// this is also supposed to enable CORS, but not sure


// initiating database connection and handling errors, shutdown, etc.
require('./app_api/models/db');

// reads all the enviroment (.env) files 
require('dotenv').config();

// Wire in our authentication module
var passport = require('passport');
require('./app_api/config/passport');

// API router
const apiRouter = require('./app_api/routes/index');
// View routers
const indexRouter = require('./app_server/routes/index');
// TODO: Remove this
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
// Define handlabars constiable
const handlebars = require('hbs');

const app = express();
// app.listen



// view engine setup
// __dirname is an environment variable in node.js that tells you the absolute path of the directory containing the currently executing file.
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials
// handlebars.registerPartials('myPartial', './app_server/views/partials');
handlebars.registerPartials(__dirname + "/app_server/views/partials");

app.set('view engine', 'hbs');


// Not working
// app.set('layout', 'layouts/layout'); // Set default layout

app.use(cors({
  origin: 'http://localhost:4200', // Specify the allowed origin
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allows specific methods
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization', // Allows specific headers
  credentials: true // Include credentials like cookies in the request
}));


// middleware - asynchronous
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parses out any of the cookie information, and attaches the data to the request in a way that
// makes it easy to reference in the controller code.
app.use(cookieParser());



// matching request against a route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);

// api router
app.use('/api', apiRouter);

// allowing the angular SAP to access the express API. does not work?
// app.use('/api', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });



// This line makes it possible to serve static content from the public directory 
// IMPORTANT: This should be after the routes, otherwise static pages get precedence over dynamic routes
// For example, the url localhost:300/ would deliver index.html in the public folder instead of index.hbs in views
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if(err.name == 'UnauthorizedError') {
    res.status(401).json({
      "message": err.name + ": " + err.message
    });
  }
  else {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  }
});

module.exports = app;