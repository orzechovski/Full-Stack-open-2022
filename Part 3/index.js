require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { query } = require("express");

morgan.token("reqInfo", (req) => {
  return JSON.stringify(req.body);
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(":method :url :status :response-time :reqInfo"));
app.use(express.static("build"));

//main page
app.get("/", (req, res) => {
  res.send("<h1>Main page</h1>");
});
//info page
app.get("/info", (req, res, next) => {
  const date = new Date();
  Person.find({})
    .then((response) => {
      res.send(`<h1>Phonebook has info for ${response.length} people</h1> <p>${date}</p>`);
    })
    .catch((err) => next(err));
});

//main api
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((person) => {
      res.json(person);
    })
    .catch((err) => next(err));
});

//single api
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const name = req.body.name;
  const number = req.body.number;

  const person = new Person({
    name,
    number,
    _id: { _id: req.params.id },
  });
  console.log({ _id: req.params.id }, person);
  Person.findByIdAndUpdate({ _id: req.params.id }, person, { new: true, runValidators: true, context: query })
    .then((updatePerson) => {
      res.json(updatePerson);
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const name = req.body.name;
  const number = req.body.number;
  if ((name || number) === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is runing on port:${port}`);
});
