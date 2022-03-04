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
    }
  ]
})

module.exports = mongoose.model("Recipe", RecipeSchema);