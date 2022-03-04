const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const recipes = require("../controllers/recipes");

router
  .route("/")
  .get(catchAsync(recipes.index))
  .post(catchAsync(recipes.createRecipe));

router.get("/new", recipes.renderNewForm);

module.exports = router;
