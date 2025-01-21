const path = require("path");
const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

// getting information in a middleware
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// defining a 404 route with a middleware function
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
  next();
});

//error handling middleware
app.use((err, res, req, next) => {
  console.log("an error occurred", err);
  res.status(500).send("Something went wrong");
  next(err);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
