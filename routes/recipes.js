const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor } = require("../middleware");

const recipes = require("../controllers/recipes");

// Show all recipes, create a new recipe
router.route("/").get(catchAsync(recipes.index)).post(isLoggedIn, catchAsync(recipes.createRecipe));

// Render create-recipe form
router.get("/new", isLoggedIn, recipes.renderNewForm);

// Show, delete, edit a specific recipe
router
  .route("/:id")
  .get(catchAsync(recipes.showRecipe))
  .delete(isLoggedIn, isAuthor, catchAsync(recipes.deleteRecipe))
  .patch(isLoggedIn, isAuthor, catchAsync(recipes.editRecipe));

// Render edit-recipe form
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(recipes.renderEditForm));

module.exports = router;
