import Greet from "./Greet";
import Counter from "./Counter";
import Event3 from "./Event3";
import Event5 from "./Event5";
import { useState } from "react";

function App2() {
  let number = [1, 2, 3, 4];
  let test = () => {};
  const [name, setName] = useState("홍길동");
  return (
    <>
      <Event5 />
      <Event3 />
      <Counter name={name} setName={setName} />
      {number.map((n, i) => {
        return (
          <li key={i}>
            <Greet />
          </li>
        );
      })}
    </>
  );
}
export default App2;
