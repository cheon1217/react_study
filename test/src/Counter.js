import { useState } from "react";

const Counter = (props) => {
  console.log("렌더링되나?");
  const [number, setNumber] = useState(0);
  const increase = () => {
    setNumber(number + 1);
    // number = number + 1;
    // console.log(number);
  };
  const decrease = () => {
    setNumber(number - 1);
  };
  const updateProps = () => {
    props.setName("김길동");
  };
  return (
    <>
      <div>
        <button onClick={increase}>증가</button>
        <button onClick={decrease}>감소</button>
      </div>
      <div>{number}</div>
      <button onClick={() => props.setName("김길동")}>prop변경</button>
      <div>{props.name}</div>
    </>
  );
};
export default Counter;
