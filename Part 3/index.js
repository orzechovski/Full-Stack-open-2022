const express = require("express");
const morgan = require("morgan");
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("reqInfo", (req, res) => {
  return JSON.stringify(req.body);
});

const app = express();

app.use(express.json());
app.use(morgan(":method :url :status :response-time :reqInfo"));

//main page
app.get("/", (req, res) => {
  res.send("<h1>Part 3</h1></h1>");
});
//info page
app.get("/info", (req, res) => {
  const phonebookLenght = persons.length;
  const date = new Date();
  res.send(`<h1>Phonebook has info for ${phonebookLenght} people</h1> <p>${date}</p>`);
});

//main api
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

//single api
app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) return res.json(person);
  res.status(400).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const checkName = persons.filter((person) => person.name === name);
  if (!name || !number) return res.status(400).json({ error: "the name or number is missing" });
  if (checkName.length !== 0) return res.status(400).json({ error: "name must be unique" });

  const person = {
    id: Math.floor(Math.random() * 1000 + persons.length),
    name,
    number,
  };
  persons = persons.concat(person);
  res.json(person);
});
const port = 3002;
app.listen(port, () => {
  console.log(`Server is runing on port:${port}`);
});
