import React from "react";

function LimitedMenu() {
  return (
    <div className="limited-menu">
      <div className="menu-item disabled">
        <div className="menu-icon user-icon"></div>
        <div className="menu-content">
          <h3>내 정보</h3>
          <p>로그인이 필요한 서비스입니다</p>
        </div>
        <div className="menu-arrow lock-icon"></div>
      </div>
      <div className="menu-item disabled">
        <div className="menu-icon calendar-icon"></div>
        <div className="menu-content">
          <h3>예약 내역</h3>
          <p>로그인이 필요한 서비스입니다</p>
        </div>
        <div className="menu-arrow lock-icon"></div>
      </div>
    </div>
  );
}

export default LimitedMenu;