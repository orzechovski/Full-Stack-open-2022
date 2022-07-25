import "./App.css";

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.nameOfPart} {props.numberOfParts}
    </p>
  );
};
const Content = (props) => {
  const parts = props.parts.map((part) => <Part nameOfPart={part.name} numberOfParts={part.exercises} />);
  return parts;
};
const Total = (props) => {
  let numberOfExercises = 0;
  props.parts.forEach((part) => (numberOfExercises += part.exercises));
  return <p>Number of exercises {numberOfExercises} </p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
