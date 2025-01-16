const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Products = require("./models/product");

const Product = Products.Product;
const Categories = Products.Categories;

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const mongoDb = "mongodb://127.0.0.1:27017/farmstand";
mongoose
  .connect(mongoDb)
  .then(() => console.log("connect express app to mongoose"))
  .catch((error) => console.log(`An error occurred ${error}`));

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("index", {
      products,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/new", async (req, res) => {
  res.render("new", {
    Categories,
  });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.render("details", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("edit", { product, Categories });
});

app.post("/products", async (req, res) => {
  const payload = req.body;
  await Product.insertMany(payload);
  res.redirect("/products");
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  await Product.findByIdAndUpdate(id, payload);
  res.redirect("/products");
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

// listening on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
