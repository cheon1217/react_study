import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../images/home.svg";
import backIcon from "../images/arrow-left.svg";

function Header({ title = "에어비앤짐", showBackButton = false, showHomeButton = false, backUrl, homeUrl }) {
  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭
  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  // 홈 버튼 클릭
  const handleHome = () => {
    if (homeUrl) {
      navigate(homeUrl);
    } else {
      navigate("/page/home");
    }
  };

  return (
    <div className="common-header">
      {showBackButton ? (
        <img
          className="back-icon"
          src={backIcon}
          alt="뒤로가기"
          onClick={handleBack}
        />
      ) : (
        <div className="back-spacer"></div>
      )}

      <div className="header-title">{title}</div>

      {showHomeButton ? (
        <img
          className="home-icon"
          src={homeIcon}
          alt="홈"
          onClick={handleHome}
        />
      ) : (
        <div className="header-spacer"></div>
      )}
    </div>
  );
}

export default Header;