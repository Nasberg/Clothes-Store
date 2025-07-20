const mongoose = require("mongoose");

// Product Schema
const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  discount: Number,
  sizes: [String],
  colors: [String],
});

// Category Schema
const categorySchema = mongoose.Schema({
  title: String,
  products: [productSchema],
});

// Products Model
const ProductsModel = mongoose.model("products", categorySchema);

// Export Model
module.exports = ProductsModel;
