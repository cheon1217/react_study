import Greet from "./Greet";

function App2() {
  let number = [1, 2, 3, 4];
  let test = () => {};
  return (
    <>
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
