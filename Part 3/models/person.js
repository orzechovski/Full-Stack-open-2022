const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.MONGO_PASSWORD;
const url = `mongodb+srv://orzechovski:${password}@cluster0.lc6yxnd.mongodb.net/Phonebook`;
mongoose.connect(url);
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name length must be at least 3, got {VALUE}"],
    required: true,
  },
  number: {
    type: String,
    required: [true, "User phone number required"],
    minLength: [8, "Name must be at least 8, got {VALUE}"],
    validate: {
      validator: (num) => {
        if (num[2] !== "-" || num[3] !== "-") {
          return /^\d{2,3}-\d+$/.test(num);
        } else {
          return false;
        }
      },
      message: "Invalid number",
    },
  },
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Person", personSchema);
