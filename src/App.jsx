import { useEffect, useState } from "react";
import "./app.css";

export default function App() {
  const [advice, setAdvice] = useState("Advice here.");
  // const [advice, setAdvice] = useState("starting Value");

  const [count, setCount] = useState(0); // counter start from 0

  async function getAdvice() {
    // For Firefox only because of Firefox-API caching system (doesn't update data) :
    const timestamp = Date.now(); // Generate a unique value
    const response = await fetch(
      `https://api.adviceslip.com/advice?timestamp=${timestamp}`
    );

    // const response = await fetch("https://api.adviceslip.com/advice"); // works fine on chrome
    const data = await response.json();
    // console.log(data.slip.advice); //Debug
    setAdvice(data.slip.advice);
    // const newValue = value + 1;
    // setCount(newValue);

    // setCount(count + 1); // or
    setCount((c) => c + 1); // or more complicated, c is old value of counter
  }

  useEffect(() => getAdvice, []); //To load content at first start, you need that [] so it doesn't run indefinitely

  return (
    <div>
      <h1>{advice}</h1>

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
