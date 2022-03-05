const Recipe = require ("./models/recipe");

// Check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  console.log("REQ.USER...", req.user);
  if (!req.isAuthenticated()) {
    // Store the url they were requesting so when they're login then are redirected back to that url
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in!");
    return res.redirect("/login");
  }
  next();
};

// Check if the current user is the author of a recipe
module.exports.isAuthor = async (req, res, next) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);
  if (!recipe.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/recipes/${recipeId}`);
  }
  next();
};
