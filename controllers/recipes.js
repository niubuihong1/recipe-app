const Recipe = require("../models/recipe");

module.exports.index = async (req, res) => {
  const recipes = await Recipe.find({})
  res.render("recipes/index", { recipes })
}

module.exports.renderNewForm = (req, res) => {
  res.render("recipes/new");
};