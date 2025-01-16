const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: String, required: true, min: 0 },
  category: {
    type: String,
    enum: ["fruits", "vegetable", "diary", "fiber", "grain", "meat", "fish"],
  },
});

const Product = mongoose.model("Product", ProductSchema);
const Categories = [
  "fruits",
  "vegetable",
  "diary",
  "fiber",
  "grain",
  "meat",
  "fish",
];
module.exports = {
  Product,
  Categories,
};
