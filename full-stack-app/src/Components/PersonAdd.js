const PersonAdd = ({ name }) => {
  return (
    <div style={{ width: `${name.length + 6}ch` }} className="person__new">
      Added {name}
    </div>
  );
};

export default PersonAdd;
