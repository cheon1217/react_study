import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Intro from "./Intro";
import Profile from "./Profile";
import Profile2 from "./Profile2";

const App5 = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route path="/profile2" element={<Profile2 />} />
      </Routes>
    </>
  );
};
export default App5;
