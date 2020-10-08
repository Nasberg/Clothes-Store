const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Import Controllers
const productsController = require("./controllers/productsController");
const usersController = require("./controllers/usersController");

// Connect to Mongodb
mongoose.connect(
  "mongodb+srv://maxedevents:maxedevents@eriksfirstcluster-0kjfp.gcp.mongodb.net/clothes_store_db?retryWrites=true&w=majority"
);
let db = mongoose.connection;

// check mongodb connection
db.once("open", () => {
  console.log("Connected to Mongodb");
});

// check for mongodb errors
db.on("error", (err) => {
  console.log("Error while connecting to Mongodb");
  console.log(err);
});

// init express
let app = express();

// init static files
app.use(express.static("./public"));

// Init json Files
app.use(express.json({ limit: "1mb" }));

// Fire Controllers
productsController(app);
usersController(app);

// listen to port
app.listen(4030, () => {
  console.log("Listening to port 4030");
});
