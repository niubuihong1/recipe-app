const express = require("express");
const router = express.Router();
const recipes = require("../controllers/recipes");

router.route("/").get(recipes.index);

module.exports = router;