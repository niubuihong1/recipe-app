const Recipe = require("../models/recipe");

module.exports.index = async (req, res) => {
  const recipes = await Recipe.find({})
  res.render("recipes/index", { recipes })
}

module.exports.renderNewForm = (req, res) => {
  res.render("recipes/new");
};

module.exports.createRecipe = async (req, res, next) => {
  console.log(req.body.recipe);
  const newRecipe = new Recipe(req.body.recipe);
  await newRecipe.save();
  res.redirect("/recipes/");
  // res.redirect(`/recipes/${newRecipe._id}`);
};