import { useState } from "react";

import Filter from "./Components/Filter";
import "./App.css";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsFiltered, setpersonsFiltered] = useState([]);
  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const checkName = persons.filter((person) => person.name === newName);
    if (checkName.length > 0) return alert(`${newName} is already added to phonebook`);
    setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }]);
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (e) => {
    const name = e.target.value;
    setFilter(name);
    setpersonsFiltered(persons.filter((person) => person.name.toLowerCase().includes(name.toLowerCase())));
  };

  //showsPhoneBook

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(e) => handleFilter(e)} personsFiltered={personsFiltered} />
      <h2>add a new</h2>
      <PersonForm
        submit={handleSubmit}
        name={newName}
        number={newNumber}
        setName={(e) => setNewName(e.target.value)}
        setNumber={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
