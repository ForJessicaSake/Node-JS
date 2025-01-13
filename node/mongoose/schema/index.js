const mongoose = require("mongoose");
const mongoDb = "mongodb://127.0.0.1:27017/products";
mongoose
  .connect(mongoDb)
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error));

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  isDicounted: {
    type: Boolean,
    default: false,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

// defining methods on schema
productSchema.method("calculateTotalPrice", function () {
  const totalPrice = this.price - (this.discount * this.price) / 100;
  console.log(totalPrice, "total price");
  this.totalPrice = totalPrice;
});

productSchema.static("getProducts", function () {
  return Product.find();
});

//defining static methods on schema
const Product = mongoose.model("Product", productSchema);

const Car = new Product({
  name: "Lexus 2009",
  price: 4500,
  isDicounted: true,
  discount: 10,
});

//accessing defined methods
Car.calculateTotalPrice();
Product.getProducts()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

Car.save()
  .then((data) =>
    console.log("New product successfully added to the database", data)
  )
  .catch((error) => console.log(error));
