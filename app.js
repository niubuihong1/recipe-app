const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");

const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const reviewRoutes = require("./routes/review");

// Set up Mongoose connection
mongoose.connect("mongodb://localhost:27017/recipe-app").catch((error) => {
  console.log("Mongoose initial connection error: ");
  console.log(error);
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
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

// use middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(flash());

const sessionConfig = {
  secret: "pleaseuseabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
}); //NOTE: have to define this before the setting up routes

// Setting up routes
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/reviews", reviewRoutes);
app.use("/", userRoutes);
app.use("/", indexRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
