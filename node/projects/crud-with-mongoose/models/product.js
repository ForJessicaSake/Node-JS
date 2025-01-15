const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true, min: 0 },
  category: {
    type: String,
    enum: ["fruits", "vegetable", "diary", "fiber", "grain", "meat", "fish"],
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
