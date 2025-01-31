const path = require("path");
const YAML = require("yamljs");
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const methodOverride = require("method-override");
const Products = require("./models/product");
const AppError = require("./error");

const Product = Products.Product;
const categories = Products.Categories;
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const mongoDb = "mongodb://127.0.0.1:27017/farmstand";

mongoose
  .connect(mongoDb)
  .then(() => console.log("connect express app to mongoose"))
  .catch((error) => console.log(`An error occurred ${error}`));

app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.render("index", {
      products,
    });
  } catch (error) {
    next(new AppError(error, 500));
  }
});

app.get("/products/new", async (req, res) => {
  res.render("new", {
    categories,
  });
});

app.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      next(new AppError("product could not be found", 404));
    } else {
      res.render("details", { product });
    }
  } catch (error) {
    next(new AppError("product not found", 404));
  }
});

app.get("/products/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("product could not be found", 404);
    } else {
      res.render("edit", { product, categories });
    }
  } catch (error) {
    next(new AppError("product could not be updated", 500));
  }
});

app.post("/products", async (req, res, next) => {
  try {
    const payload = req.body;
    await Product.insertMany(payload);
    res.redirect("/products");
  } catch (error) {
    next(new AppError("product could not be created", 500));
  }
});

app.patch("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await Product.findByIdAndUpdate(id, payload);
    res.redirect("/products");
  } catch (error) {
    next(new AppError("product could not be updated", 500));
  }
});

app.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
  } catch (error) {
    next(new AppError("product could not be deleted", 500));
  }
});

//error handling middleware
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send(message);
});

// listening on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
