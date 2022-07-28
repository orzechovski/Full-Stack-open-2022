const Total = ({ parts }) => {
  let numberOfExercises = parts.reduce((s, p, index) => {
    if (index < 2) {
      return s.exercises + p.exercises;
    } else {
      return s + p.exercises;
    }
  });

  return <p style={{ fontWeight: "bold" }}>Number of exercises {numberOfExercises} </p>;
};
export default Total;
