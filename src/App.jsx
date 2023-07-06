import { useEffect, useState } from "react";
import "./app.css";

export default function App() {
  const [advice, setAdvice] = useState(""); // "Default Value"
  const [count, setCount] = useState(0); // counter start from 0
  const [history, setHistory] = useState([]); // history's array contains all generated advices

  async function getAdvice() {
    // For Firefox only because of Firefox-API caching system (doesn't update data) :
    // const response = await fetch("https://api.adviceslip.com/advice"); // works fine on chrome

    const timestamp = Date.now(); // Generate a unique value
    const response = await fetch(
      `https://api.adviceslip.com/advice?timestamp=${timestamp}`
    );

    const data = await response.json();
    const anAdvice = data.slip.advice;
    // console.log(anAdvice);

    setAdvice(anAdvice);
    if (history.length < 10)
      setHistory((prevAdvice) => [...prevAdvice, anAdvice]);

    // const newValue = value + 1;
    // setCount(newValue);

    // setCount(count + 1); // or
    setCount((c) => c + 1); // or more complicated, c is old value of counter
  }

  useEffect(() => getAdvice, []); //To load content at first start, you need that [] so it doesn't run indefinitely
  console.log("This:", history);

  return (
    <>
      <div className="adviceSection">
        <p className="advice">{advice}</p>
        <button
          className="btn"
          onClick={getAdvice}
          style={{ fontWeight: "bold" }}
        >
          New advice
        </button>
        <Message count={count} />
        {/* count (next to message) is a prop and receive count */}
      </div>
      <div className="history">
        <h3 className="history-title">
          Advices in history [{history.length}] :
        </h3>
        <ul>
          {history.map((advice, index) => {
            if (index > 9) return null;
            <li key={index + 1}> </li>;
            return <li key={index + 1}> {advice} </li>;
          })}
        </ul>
        <div className="warningMessage">
          {history.length > 9 ? (
            <h3>
              Maximum number of advices allowed in the history is reached.
            </h3>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Message(props) {
  // Props-Object
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
