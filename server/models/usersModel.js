const mongoose = require("mongoose");

// Product Schema
const productSchema = mongoose.Schema({
  category: String,
  title: String,
  price: Number,
  discount: Number,
  sizes: [String],
  selectedSize: String,
  colors: [String],
  selectedColor: String,
  selectedQuantity: Number,
});

// Purchase Schema
const purchasesSchema = mongoose.Schema({
  date: Date,
  total: Number,
  items: [productSchema],
});

// User Main Schema
const userMainSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  cart: [productSchema],
  purchases: [purchasesSchema],
});

// Users Model
const UsersModel = mongoose.model("users", userMainSchema);

// Export Model
module.exports = UsersModel;
