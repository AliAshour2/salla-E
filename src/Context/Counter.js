import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(10);
  function increase()
  {
    setCounter(counter+1)
  }
  return (
    <CounterContext.Provider value={{counter,increase}}>
      {props.children}
    </CounterContext.Provider>
  );
}
