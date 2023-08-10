import { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = props => {
    const { good, neutral, bad } = props;
    const total = good + neutral + bad;

    if (total === 0) return <p>No feedback given</p>;
    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={total} />
                <StatisticLine text="average" value={(good - bad) / total} />
                <StatisticLine text="positive" value={(good / total) * 100 + " %"} />
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => setGood(good + 1);
    const handleNeutralClick = () => setNeutral(neutral + 1);
    const handleBadClick = () => setBad(bad + 1);

    return (
        <div>
            <Header title="give feedback" />
            <Button text="good" onClick={handleGoodClick} />
            <Button text="neutral" onClick={handleNeutralClick} />
            <Button text="bad" onClick={handleBadClick} />
            <Header title="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App;