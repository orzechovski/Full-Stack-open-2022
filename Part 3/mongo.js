const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.MONGO_PASSWORD;
const url = `mongodb+srv://orzechovski:${password}@cluster0.lc6yxnd.mongodb.net/Phonebook`;
const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = mongoose.model("Person", personSchema);

mongoose.connect(url);

if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person
    .save()
    .then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(`💥ERROR: ${err}`));
} else {
  Person.find({})
    .then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    })
    .catch((err) => console.log(`💥ERROR: ${err}`));
}
