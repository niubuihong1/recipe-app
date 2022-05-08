const Review = require("../models/review");
const { Recipe } = require("../models/recipe");

// Create a new review
module.exports.createReview = async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  recipe.reviews.push(newReview);
  await newReview.save();
  await recipe.save();
  req.flash("success", "Successfully created a new review!");
  res.redirect(`/recipes/${recipe._id}`);
};

// Delete a review
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //NOTE: could use mongoose middleware to handle deleting review from recipe
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted a review!");
  res.redirect(`/recipes/${id}`);
};
