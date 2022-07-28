const Persons = ({ persons }) => {
  const phoneBook = persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  ));
  return phoneBook;
};

export default Persons;
