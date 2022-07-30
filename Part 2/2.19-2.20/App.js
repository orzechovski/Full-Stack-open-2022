import "./App.css";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import PersonAdd from "./Components/PersonAdd";
import ShowError from "./Components/ShowError";
import phoneBook from "./services/phoneBook";

import { useState, useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phoneBook.getAll().then((initialData) => setPersons(initialData));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsFiltered, setpersonsFiltered] = useState([]);
  const [newPersonAdded, setNewPersonAdded] = useState("");
  const [error, setError] = useState("");
  //submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //new person object
    const newPersonsBook = { name: newName, number: newNumber };

    if (newName === "" || newNumber === "") return alert("Name and Number cant be empty");

    let checkName = persons.filter((person) => person.name === newName);

    //do poprawy to
    if (checkName.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phoneBook.update(checkName[0].id, newPersonsBook).then((res) => setPersons(persons.map((person) => (person.id !== checkName[0].id ? person : res))));
        setNewName("");
        setNewNumber("");
      }
      return;
    }
    //sets new person to phonebook
    phoneBook.create(newPersonsBook).then((res) => setPersons([...persons, res]));

    setNewPersonAdded(newName);
    //clear inputs
    setNewName("");
    setNewNumber("");

    setTimeout(() => setNewPersonAdded(""), 3000);
  };

  const handleFilter = (e) => {
    if (persons.length > 0) {
      const name = e.target.value;
      setFilter(name);
      setpersonsFiltered(persons.filter((person) => (person.name === undefined ? null : person.name.toLowerCase().includes(name.toLowerCase()))));
    }
  };

  //showsPhoneBook

  return (
    <div>
      <h2>Phonebook</h2>
      {error.length > 0 ? <ShowError error={error} /> : null}
      {newPersonAdded.length > 0 ? <PersonAdd name={newPersonAdded} /> : null}
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
      <Persons setError={setError} click={phoneBook.del} persons={persons} />
    </div>
  );
};

export default App;
