import { useState, useCallback } from "react";
import Light from "./Light";

const UseCallbackTest = () => {
  console.log("부모 렌더링");
  const [light, setLight] = useState(false);

  // const toggle = () => {
  //   setLight(!light);
  // };
  const toggle = useCallback(() => {
    console.log("toggle함수");
    //setLight(!light);
    setLight((light) => !light);
  }, []);
  return (
    <>
      <div>{light ? "on" : "off"}</div>
      <div>
        <button onClick={toggle}>부모에서 토글</button>
      </div>
      <div>
        <Light toggle={toggle} />
      </div>
    </>
  );
};
export default UseCallbackTest;
