const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const users = require("../controllers/users");

router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register))

module.exports = router;