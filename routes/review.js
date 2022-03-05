const express = require("express")
const router = express.Router({mergeParams: true});

const catchAsync = require("../utils/catchAsync")
const reviews = require("../controllers/reviews")

router.post("/", catchAsync(reviews.createReview))

module.exports = router;