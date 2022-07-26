import { useState } from "react";
import "./App.css";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  let votes = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(votes);

  const handleClick = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  const handleVote = () => {
    const newVotes = [...vote];
    newVotes[selected] += 1;
    setVote(newVotes);
  };

  let bigestVote = 0;
  vote.forEach((element) => (element > bigestVote ? (bigestVote = element) : bigestVote));
  const bigAnecdote = vote.indexOf(bigestVote);

  return (
    <>
      <h2>Anecodote of the day</h2>
      <h5>{anecdotes[selected]}</h5>
      <p style={{ fontWeight: "bold" }}>has {vote[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecodote with most votes</h2>
      <p>{anecdotes[bigAnecdote]}</p>
    </>
  );
};

export default App;
