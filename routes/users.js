const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

const users = require("../controllers/users");

// GET register form, POST register form
router.route("/register").get(users.renderRegister).post(catchAsync(users.register));

// GET login form, POST login form
router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
    users.login
  );

// GET logout 
router.get("/logout", users.logout);

module.exports = router;
