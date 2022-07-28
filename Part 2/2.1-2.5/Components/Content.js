import Part from "./Part";

const Content = (props) => {
  const parts = props.parts.map((part) => <Part key={part.id} nameOfPart={part.name} numberOfParts={part.exercises} />);
  return parts;
};
export default Content;
