var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars')
var db = require('./config/connection')
var session = require('express-session')
var fileUpload = require('express-fileupload')

var indexRouter = require('./routes/home');
var usersRouter = require('./routes/admin');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');
// const { sign } = require('crypto');
var oneDay = 1000*60*60*60*24;

var app = express();

app.use(fileUpload())
app.use(session({
  secret:'key',
  cookie:{maxAge: oneDay},
  saveUninitialized:false,
  resave:false
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs',hbs.engine({
  extname:'hbs',
  defaultLayout:'layout',
  layoutsDir:__dirname + '/views/Layout/',
  partialsDir:__dirname+ '/views/partials'
}));

db.connect((err)=>{
   if(err){
    console.log('Connection Error'+err);
   }else{
    console.log('data base connected');
   }
});

app.use('/signup',signupRouter);
app.use('/',signinRouter);
app.use('/home', indexRouter);
app.use('/admin', usersRouter);

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
