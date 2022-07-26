import { useState } from "react";
import "./App.css";
const RateButton = ({ name, value, click, rate }) => {
  return <button onClick={() => click({ ...rate, [name]: rate[name] + value })}>{name}</button>;
};

const SetFeedBack = ({ setRate, rate }) => {
  const rates = [
    { name: "good", value: 1 },
    { name: "neutral", value: 1 },
    { name: "bad", value: 1 },
  ];
  const rateButtons = rates.map((stats) => <RateButton key={stats.name} rate={rate} click={setRate} name={stats.name} value={stats.value} />);

  return rateButtons;
};
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ rate }) => {
  const all = rate.good + rate.neutral + rate.bad;
  return (
    <>
      <h3>statistics</h3>
      <table>
        <tbody>
          <StatisticsLine text="good" value={rate.good} />
          <StatisticsLine text="neutral" value={rate.neutral} />
          <StatisticsLine text="bad" value={rate.bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={(rate.good - rate.bad) / all} />
          <StatisticsLine text="positive" value={`${(rate.good / all) * 100}%`} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [rate, setRate] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  return (
    <>
      <h1>give feedback</h1>
      <SetFeedBack setRate={setRate} rate={rate} />
      {rate.good > 0 || rate.bad > 0 || rate.neutral > 0 ? <Statistics rate={rate} /> : <p>No feedback given</p>}
    </>
  );
};

export default App;
