var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cloudinary = require('cloudinary')
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin')
var app = express();

cloudinary.config({ 
  cloud_name: 'dnagcjjys', 
  api_key: '492971939673584', 
  api_secret: '8seswvc-FHZryO3Zzp6ctGNrNwU' 
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use((req, res, next)=> {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
/*
Application level middleware:
Every route handler is a middleware function, and we can call route handlers application-level middleware. Usually, we bind application-level middleware to an instance of the app object by using the app.use() and app.
*/

// app.use((req,res,next)=>{
//   console.log("Application level middleware for all route")
//   next()
// })
// app.use('/users',(req,res,next)=>{
//   console.log("Application level middleware for users route")
//   next()
// })

/*
Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
*/
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
/*
configure for image upload
*/
app.use('/uploads',express.static('uploads'))
app.use('/category',express.static('category'))
app.use('/subcategory',express.static('subcategory'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
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

module.exports = app;
