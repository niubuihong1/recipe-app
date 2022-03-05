const Review = require("../models/review");
const Recipe = require ("../models/recipe");

module.exports.createReview = async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    const newReview = new Review(req.body.review);
    // newReview.author = req.user._id;
    recipe.reviews.push(newReview);
    await newReview.save();
    await recipe.save();
    req.flash("success", "Successfully created a new review!")
    res.redirect(`/recipes/${recipe._id}`);
};