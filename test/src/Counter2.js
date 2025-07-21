import { useReducer } from "react";

const Counter2 = () => {
  function reducer(number, action) {
    if (action.type === "INCREASE") {
      return { value: number.value + 1 };
    } else if (action.type === "DECREASE") {
      return { value: number.value - 1 };
    } else {
      return number;
    }
  }
  const [number, dispatcher] = useReducer(reducer, { value: 0 });

  return (
    <>
      <div>
        <div>{number.value}</div>
        <button onClick={() => dispatcher({ type: "INCREASE" })}>증가</button>
        <button onClick={() => dispatcher({ type: "DECREASE" })}>감소</button>
      </div>
    </>
  );
};
export default Counter2;
