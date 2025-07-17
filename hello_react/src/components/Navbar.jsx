import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { member, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">ReactBoard</Link>
        <div>
          {member ? (
            <>
              <span className="navbar-text me-3">👤 {member.name}</span>
              <Link to="/write" className="btn btn-outline-light me-2">글쓰기</Link>
              <button className="btn btn-outline-warning" onClick={logout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">로그인</Link>
              <Link to="/signup" className="btn btn-outline-success">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
