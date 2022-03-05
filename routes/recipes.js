const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");

const recipes = require("../controllers/recipes");

router.route("/").get(catchAsync(recipes.index)).post(isLoggedIn, catchAsync(recipes.createRecipe));

router.get("/new", recipes.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(recipes.showRecipe))
  .delete(catchAsync(recipes.deleteRecipe))
  .patch(catchAsync(recipes.editRecipe));

router.get("/:id/edit", catchAsync(recipes.renderEditForm));

module.exports = router;
