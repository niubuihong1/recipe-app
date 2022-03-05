const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateRecipe } = require("../middleware");

const recipes = require("../controllers/recipes");

// GET all recipes, POST a new recipe
router
  .route("/")
  .get(catchAsync(recipes.index))
  .post(isLoggedIn, validateRecipe, catchAsync(recipes.createRecipe));

// GET create-recipe form
router.get("/new", isLoggedIn, recipes.renderNewForm);

// GET, DELETE, PATCH a specific recipe
router
  .route("/:id")
  .get(catchAsync(recipes.showRecipe))
  .delete(isLoggedIn, isAuthor, catchAsync(recipes.deleteRecipe))
  .patch(isLoggedIn, isAuthor, validateRecipe, catchAsync(recipes.editRecipe));

// GET edit-recipe form
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(recipes.renderEditForm));

module.exports = router;
