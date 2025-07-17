import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WriteBoard from './pages/WriteBoard';
import BoardDetail from './pages/BoardDetail';
import EditBoard from './pages/EditBoard';
import Navbar from './components/Navbar';
import './App.css'; // 스타일 파일 임포트
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/write" element={<WriteBoard />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/edit/:id" element={<EditBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
