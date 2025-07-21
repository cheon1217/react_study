import { useState, useEffect } from "react";

const Hooks2 = () => {
  const [today, setToday] = useState(new Date());

  //   setInterval(() => {
  //     setToday(new Date());
  //     console.log(today);
  //   }, 1000);

  useEffect(() => {
    setInterval(() => {
      setToday(new Date());
      console.log(today);
    }, 1000);
  }, []); // 의존배열이 빈배열이면 처음렌더링됐을때 한번만 실행

  return <>{today.toString()}</>;
};
export default Hooks2;
