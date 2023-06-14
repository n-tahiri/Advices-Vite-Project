import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("Advice here.");
  // const [advice, setAdvice] = useState("starting Value");

  const [count, setCount] = useState(0); // counter start from 0

  async function getAdvice() {
    // For Firefox only because of API caching system:
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
      <button onClick={getAdvice} style={{ fontWeight: "bold" }}>
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

/*
Code below to be ignored
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
