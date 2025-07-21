import { useState, useMemo } from "react";

const Hooks3 = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const insert = (e) => {
    console.log(document.querySelector("#number").value);
    setList([...list, parseInt(number)]);
  };

  const sum = (list) => {
    console.log("합계 계산");
    let sum = 0;
    list.forEach((e) => {
      sum += e;
    });
    return sum;
  };

  const t = useMemo(() => sum(list), [list]);

  return (
    <>
      <input type="text" value={number} id="number" onChange={onChange} />
      <button onClick={insert}>등록</button>
      <ul>
        {list.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
      <div>합계:{t}</div>
    </>
  );
};
export default Hooks3;
