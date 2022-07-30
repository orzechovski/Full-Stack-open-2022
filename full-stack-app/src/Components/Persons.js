const Persons = ({ persons, click, setError }) => {
  // .then((res) => setPersons(persons.map((phonePerson) => (phonePerson.id !== person.id ? phonePerson : res))))
  const phoneBook = persons.map((person) => (
    <div key={person.name}>
      <span>
        {person.name} {person.number}
      </span>
      <button
        onClick={(e) =>
          window.confirm(`Delete ${person.name}?`)
            ? click(person.id)
                .then(e.target.parentNode.remove())
                .catch(() => {
                  setError(`Information of ${person.name} had already been removed from server`);
                  setTimeout(() => setError(""), 3000);
                })
            : null
        }
      >
        delete
      </button>
    </div>
  ));
  return phoneBook;
};

export default Persons;
