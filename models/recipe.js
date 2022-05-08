const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review");

const RecipeSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  image: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Delete all associated reviews after deleting a recipe
RecipeSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports.findOneRecipe = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId)
  .populate({
    path: "reviews",
    populate: {
      path: "author",
    },
    })
    .populate("author");
  console.log("REFACTORED", recipe);
  return recipe
}

module.exports.Recipe = Recipe; 
