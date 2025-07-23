import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const onRegister = () => {
    if (!username || !pw || !pw2 || !nickname) {
      alert("모든 항목을 입력하세요.");
      return;
    }
    if (pw !== pw2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === username)) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }
    users.push({ id: Date.now(), username, password: pw, nickname });
    localStorage.setItem("users", JSON.stringify(users));
    alert("회원가입 완료! 로그인 해주세요.");
    navigate("/login");
  };

  return (
    <div>
      <Header title="회원가입" />
      <div className="register-container">
        <input
          placeholder="아이디"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="닉네임"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={pw2}
          onChange={e => setPw2(e.target.value)}
        />
        <Button text="회원가입" type="positive" onClick={onRegister} />
        <Button text="로그인으로" onClick={() => navigate("/login")} />
      </div>
    </div>
  );
};

export default Register;