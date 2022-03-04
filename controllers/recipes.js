const Recipe = require("../models/recipe");

module.exports.index = async (req, res) => {
  const recipes = await Recipe.find({});
  res.render("recipes/index", { recipes });
};

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

module.exports.showRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  console.log(recipe);
  if (!recipe) {
    return res.redirect("/recipes");
  }
  res.render("recipes/show", { recipe });
};

module.exports.deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;
  await Recipe.findByIdAndDelete(recipeId); //NOTE: delete associated reviews with mongoose middleware, but it's specific for .findByIdAndDelete
  res.redirect("/recipes");
};

module.exports.renderEditForm = async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
      return res.redirect("/recipes");
  }
  res.render("recipes/edit", { recipe });
};
