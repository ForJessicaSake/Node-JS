const mongoose = require("mongoose");
const mongoDb = "mongodb://127.0.0.1:27017/animalshelter";

mongoose
  .connect(mongoDb)
  .then(() => {
    console.log("mongoose is connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

// defining a schema
const AnimalShelterSchema = mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  isUpForAdoption: Boolean,
});

//defining a model
const Dog = mongoose.model("Dog", AnimalShelterSchema);

const newDog = new Dog({
  name: "spot",
  age: 2,
  breed: "Labrador",
  isUpForAdoption: true,
});

// adding new dog to the dogs database
newDog
  .save()
  .then(() => "dog has been registered to db")
  .catch((error) => console.log(error));

// Insert many method
Dog.insertMany([
  {
    name: "spot",
    age: 2,
    breed: "Labrador",
    isUpForAdoption: true,
  },
  {
    name: "roger",
    age: 4,
    breed: "Golden retriever",
    isUpForAdoption: false,
  },
]);

//find methods
Dog.find({}).then((data) => console.log(data, "all data"));
Dog.find({ name: "spot" }).then((data) => console.log(data, "spot"));
Dog.findById("678130a18a9634ca1a393764").then((data) =>
  console.log(data, "find random dog with id")
);

// //delete methods
Dog.deleteMany({ name: "spot" }).then(() =>
  console.log("all spot dogs deleted")
);
Dog.deleteOne({ name: "roger" }).then(() =>
  console.log("first roger dogs deleted")
);
Dog.findByIdAndDelete("6781312e31a29daad095d447").then(() =>
  console.log("random roger dogs deleted")
);

//update methods
Dog.updateOne({ name: "roger" }, { isUpForAdoption: true }).then(() =>
  console.log("roger isUpForAdoption updated")
);
Dog.updateMany(
  {
    name: "roger",
  },
  {
    isUpForAdoption: false,
  }
).then((msg) => console.log(msg, "newly updated data"));
