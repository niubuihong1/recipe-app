const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");

// Create a new review
router.post("/", isLoggedIn, catchAsync(reviews.createReview));

// Delete a review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
