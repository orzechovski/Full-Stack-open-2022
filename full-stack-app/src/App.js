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
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  };

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
