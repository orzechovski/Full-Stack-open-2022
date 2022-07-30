const Filter = ({ value, onChange, personsFiltered }) => {
  const showFilteredPersons = personsFiltered.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}
    </div>
  ));
  return (
    <>
      filter shown with <input value={value} onChange={onChange} />
      <div>{value === "" ? null : showFilteredPersons}</div>
    </>
  );
};

export default Filter;
