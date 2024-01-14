const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { request } = require("undici-types");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use((urlencodedParser = bodyParser.urlencoded({ extended: false })));

const users = [
  {
    id: 1,
    name: "Sabina",
    surname: "Bakirzada",
  },

  {
    id: 2,
    name: "Zaynab",
    surname: "Bakirzada",
  },
];

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);
  res.json(user);
});

app.post("/users", (req, res) => {
  const user = {
    id: uuidv4(),
    name: req.body.name,
    surname: req.body.surname,
  };
  users.push(user);

  res.json(users);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const updatedUsers = users.filter((u) => u.id != id);
  res.json(updatedUsers);
});
const PORT = 8080;
app.listen =
  (PORT,
  () => {
    console.log(`Port is running on ${PORT}`);
  });
