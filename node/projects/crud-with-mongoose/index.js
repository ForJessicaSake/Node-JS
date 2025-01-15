const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoDb = "mongodb://127.0.0.1:27017/farmstand";
mongoose
  .connect(mongoDb)
  .then(() => console.log("connect express app to mongoose"))
  .catch((error) => console.log(`An error occurred ${error}`));

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.render("index", {
      products,
    });
  } catch (error) {
    console.log(error);
  }
});

// listening on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
