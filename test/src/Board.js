import { useState, useCallback } from "react";
import BoardList from "./BoardList";

function createData() {
  const arr = [];
  for (let i = 0; i < 3000; i++) {
    arr.push({ no: i, title: "제목" + i, checked: false });
  }
  return arr;
}
const Board = () => {
  const [board, setBoard] = useState(createData);
  const toggleChecked = useCallback((no) => {
    const board2 = (board) =>
      board.map((b) => (b.no === no ? { ...b, checked: !b.checked } : b));
    setBoard(board2);
  }, []);
  return (
    <>
      {board.map((e, i) => (
        <BoardList key={i} board={e} changeChecked={toggleChecked} />
      ))}
    </>
  );
};
export default Board;
