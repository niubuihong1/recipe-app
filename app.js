const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")
const methodOverride = require('method-override')
const session = require("express-session")
const flash = require("connect-flash")



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipeRoutes = require("./routes/recipes")

// Set up Mongoose connection
mongoose.connect('mongodb://localhost:27017/recipe-app').catch((error) => {
  console.log("Mongoose initial connection error: ");
  console.log(error)
});

const db = mongoose.connection;
db.on("error", () => {
  console.error.bind(console, "Connection error: ");
});

db.once("open", () => {
  console.log("Database connected.");
});




const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs", ejsMate)
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(flash())

const sessionConfig = {
  secret: 'pleaseuseabettersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
  }
}
app.use(session(sessionConfig))

// Set locals for flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
}) //NOTE: have to define this before the setting up routes

// Setting up routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/recipes", recipeRoutes);

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
