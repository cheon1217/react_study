import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfoSection from "../components/mypage/UserInfoSection";
import MenuSection from "../components/mypage/MenuSection";
import LimitedMenu from "../components/mypage/LimitedMenu";
import Header from "../components/Header";

function MyPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setNickname("홍길동");
      setEmail("hong@airbng.com");
      setIsLoggedIn(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 로그아웃 로직 (더미)
  const handleLogout = async () => {
    if (!window.confirm("정말로 로그아웃하시겠습니까?")) return;
    setNickname("");
    setEmail("");
    setIsLoggedIn(false);
    navigate("/page/home");
  };

  return (
    <div className="container">
      <Header title="마이페이지" showBackButton={false} showHomeButton={true} />
      <main className="main-content">
        {!isLoggedIn ? (
          <LimitedMenu />
        ) : (
          <>
            <UserInfoSection nickname={nickname} email={email} />
            <MenuSection onLogout={handleLogout} />
          </>
        )}
      </main>
    </div>
  );
}

export default MyPage;