const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

// Init Encoder Parser
const urlEncoderParser = bodyParser.urlencoded({ extended: false });

// Import Models
const ProductsModel = require("../models/productsModel");

// AWS S3
const s3 = new aws.S3({
  accessKeyId: "AKIAXAZ5FFGGN4QPF4RU",
  secretAccessKey: "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",
  Bucket: "clothesstore",
});

// Single Image Upload
const imgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "clothesstore",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("productImage");

module.exports = (app) => {
  // Get all products
  app.get("/get-products", (req, res) => {
    ProductsModel.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

  // Add product category
  app.post("/add-product-category", urlEncoderParser, (req, res) => {
    const newCategory = new ProductsModel(req.body).save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

  // Update Product Category
  app.put("/update-product-category/:id", urlEncoderParser, (req, res) => {
    ProductsModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
      },
      { new: true },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      }
    );
  });

  // Delete Product Category
  app.delete("/delete-product-category/:id", (req, res) => {
    ProductsModel.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

  // Add Product
  app.post("/add-product/:categoryId", (req, res) => {
    ProductsModel.findById({ _id: req.params.categoryId }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.products.push(req.body);
        data.save();
        res.json(data);
      }
    });
  });

  // Update Product
  app.put("/update-product/:productId", (req, res) => {
    ProductsModel.findOne(
      { "products._id": req.params.productId },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const { title, price, discount, sizes, colors } = req.body;

          data.products.id(req.params.productId).title = title;
          data.products.id(req.params.productId).price = price;
          data.products.id(req.params.productId).discount = discount;
          data.products.id(req.params.productId).sizes = sizes;
          data.products.id(req.params.productId).colors = colors;
          data.save();
          res.json(data);
        }
      }
    );
  });

  // Delete Product
  app.delete("/delete-product/:productId", (req, res) => {
    ProductsModel.findOne(
      { "products._id": req.params.productId },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          data.products.id(req.params.productId).remove();
          data.save();
          res.json(data);
        }
      }
    );
  });
};
