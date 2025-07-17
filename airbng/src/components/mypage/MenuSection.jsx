import React from "react";
import { useNavigate } from "react-router-dom";

function MenuSection({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="menu-section">
      <div className="menu-item active" onClick={() => navigate("/page/mypage/info")}>
        <div className="menu-icon user-icon"></div>
        <div className="menu-content">
          <h3>내 정보 보기/수정</h3>
          <p>개인정보를 확인하고 수정하세요</p>
        </div>
        <div className="menu-arrow right-arrow"></div>
      </div>
      <div className="menu-item active" onClick={() => navigate("/page/reservations/list")}>
        <div className="menu-icon calendar-icon"></div>
        <div className="menu-content">
          <h3>예약 내역 보기</h3>
          <p>나의 예약 현황을 확인하세요</p>
        </div>
        <div className="menu-arrow right-arrow"></div>
      </div>
      <div className="menu-item logout" onClick={onLogout}>
        <div className="menu-icon logout-icon"></div>
        <div className="menu-content">
          <h3>로그아웃</h3>
          <p>안전하게 로그아웃하세요</p>
        </div>
        <div className="menu-arrow right-arrow"></div>
      </div>
    </div>
  );
}

export default MenuSection;