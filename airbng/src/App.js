import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import HomePage from "./pages/HomePage";
import LockersPage from "./pages/LockersPage";
import ChatPage from "./pages/ChatPage";
import ReservationsPage from "./pages/ReservationsPage";
import MyPage from "./pages/MyPage";
import LockerDetail from "./pages/LockerDetail";

function App() {
  function getActiveNav(pathname) {
    if (pathname.startsWith("/page/lockers")) return "cart";
    if (pathname.startsWith("/page/chatList")) return "chat";
    if (pathname.startsWith("/page/reservations")) return "calendar";
    if (pathname.startsWith("/page/mypage")) return "mypage";
    return "home";
  }

  function MainContent() {
    const location = useLocation();
    const active = getActiveNav(location.pathname);

    return (
      <div className="airbng-home">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page/home" element={<HomePage />} />
          <Route path="/page/lockers" element={<LockersPage />} />
          <Route path="/page/chatList" element={<ChatPage />} />
          <Route path="/page/reservations/list" element={<ReservationsPage />} />
          <Route path="/page/mypage" element={<MyPage />} />
          <Route path="/page/lockers/:lockerId" element={<LockerDetail />} />
        </Routes>
        <Navbar active={active} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

export default App;
