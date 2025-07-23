import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const onLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === pw);
    if (!user) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    localStorage.setItem("loginUser", user.id);
    alert("로그인 성공!");
    navigate("/");
  };

  return (
    <div>
      <Header title="로그인" />
      <div className="login-container">
        <input
          placeholder="아이디"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />
        <Button text="로그인" type="positive" onClick={onLogin} />
        <Button text="회원가입" onClick={() => navigate("/register")} />
        <Button text="홈으로" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default Login;