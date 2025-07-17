import "./App.css";
import Test from "./Test";

function App() {
  const name = "React";
  //const greet = false;
  const style = {
    backgroundColor: "black",
    color: "white",
  };
  return (
    <>
      {
        // 주석
      }
      <h1 class="a" style={style}>
        Hello {name}
      </h1>
      <h2
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        World
      </h2>
      {name && <h2>안녕하세요</h2>}
      <Test />
    </>
  );
}

export default App;
