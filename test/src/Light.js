import React from "react";

export default React.memo(({ toggle }) => {
  console.log("자식 렌더링");
  return (
    <>
      <button onClick={toggle}>자식에서 토글</button>
    </>
  );
});
