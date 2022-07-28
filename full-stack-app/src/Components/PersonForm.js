const PersonForm = ({ name, number, setName, setNumber, submit }) => {
  return (
    <form onSubmit={submit}>
      <div>
        name: <input value={name} onChange={setName} />
      </div>
      <div>
        number: <input value={number} onChange={setNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
