const path = require("path");
const express = require("express");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const generateRandomId = Math.floor(Math.random() * 10) + 1;

app.get("/todos", (req, res) => {
  res.render("index", { todos });
});

app.get("/todos/new", (req, res) => {
  res.render("new");
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === id);
  res.render("details", { todo });
});

app.get("/todos/:id/edit", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === id);
  res.render("edit", { todo });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== id);
  res.redirect("/todos");
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const todo = todos.find((todo) => todo.id === id);
  todo.description = description;
  res.redirect("/todos");
});

app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  const todo = {
    title,
    description,
    id: uuid(),
    userId: generateRandomId,
  };
  todos.push(todo);
  res.redirect("/todos");
});

app.listen(3000, () => console.log("running on port 3000"));

let todos = [
  {
    userId: 1,
    id: uuid(),
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    description:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: uuid(),
    title: "qui est esse",
    description:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: uuid(),
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    description:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 2,
    id: uuid(),
    title: "et ea vero quia laudantium autem",
    description:
      "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
  },
  {
    userId: 2,
    id: uuid(),
    title: "in quibusdam tempore odit est dolorem",
    description:
      "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
  },
  {
    userId: 3,
    id: uuid(),
    title: "delectus ullam et corporis nulla voluptas sequi",
    description:
      "non et quaerat ex quae ad maiores\nmaiores recusandae totam aut blanditiis mollitia quas illo\nut voluptatibus voluptatem\nsimilique nostrum eum",
  },
  {
    userId: 3,
    id: uuid(),
    title: "iusto eius quod necessitatibus culpa ea",
    description:
      "odit magnam ut saepe sed non qui\ntempora atque nihil\naccusamus illum doloribus illo dolor\neligendi repudiandae odit magni similique sed cum maiores",
  },
  {
    userId: 4,
    id: uuid(),
    title: "ullam ut quidem id aut vel consequuntur",
    description:
      "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae",
  },
  {
    userId: 4,
    id: uuid(),
    title: "doloremque illum aliquid sunt",
    description:
      "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime",
  },
  {
    userId: 4,
    id: uuid(),
    title: "qui explicabo molestiae dolorem",
    description:
      "rerum ut et numquam laborum odit est sit\nid qui sint in\nquasi tenetur tempore aperiam et quaerat qui in\nrerum officiis sequi cumque quod",
  },
];
