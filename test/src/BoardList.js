import React from "react";

const BoardList = ({ board, changeChecked }) => {
  console.log("BoardList렌더링");
  const { no, title, checked } = board;
  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={checked ? "checked" : ""}
          onChange={() => changeChecked(no)}
        />
        {no} {title}
      </div>
    </>
  );
};
export default React.memo(BoardList);
