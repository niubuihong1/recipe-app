const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");

const recipes = require("../controllers/recipes");

// Show all recipes, create a new recipe
router.route("/").get(catchAsync(recipes.index)).post(isLoggedIn, catchAsync(recipes.createRecipe));

// Render create-recipe form
router.get("/new", isLoggedIn, recipes.renderNewForm);

// Show, delete, edit a specific recipe
router
  .route("/:id")
  .get(catchAsync(recipes.showRecipe))
  .delete(isLoggedIn, catchAsync(recipes.deleteRecipe))
  .patch(isLoggedIn, catchAsync(recipes.editRecipe));

// Render edit-recipe form
router.get("/:id/edit", isLoggedIn, catchAsync(recipes.renderEditForm));

module.exports = router;
