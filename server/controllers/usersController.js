const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import Model
const UsersModel = require("../models/usersModel");

// Init Encoder Parser
const urlEncoderParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  // Get All Users
  app.get("/get-users", (req, res) => {
    UsersModel.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

  // Get Specific User
  app.get("/get-user/:id", (req, res) => {
    UsersModel.findById({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

  // Create User
  app.post("/create-user", (req, res) => {
    const newUser = new UsersModel(req.body).save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

  // Update User
  app.put("/update-user/:id", (req, res) => {
    UsersModel.findById({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.save();
        res.json(data);
      }
    });
  });

  // Add Item to User Cart
  app.post("/add-to-cart/:userId", urlEncoderParser, (req, res) => {
    UsersModel.findById({ _id: req.params.userId }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.cart.push(req.body);
        data.save();
        res.json(data);
      }
    });
  });

  // Delete Item From User Cart
  app.delete("/delete-from-cart/:userId/:itemId", (req, res) => {
    UsersModel.findById({ _id: req.params.userId }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.cart.id(req.params.itemId).remove();
        data.save();
        res.json(data);
      }
    });
  });

  // Purchase Cart Items
  app.put("/buy-products/:userId", (req, res) => {
    UsersModel.findById({ _id: req.params.userId }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.purchases.push({
          date: new Date(),
          items: data.cart,
          total: data.cart.reduce((total, item) => total + item.price, 0),
        });
        data.cart = [];
        data.save();
        res.json(data);
      }
    });
  });
};
