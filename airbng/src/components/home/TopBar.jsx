import React from 'react';
import logoImg from '../../images/logo_ic.svg';
import bellImg from '../../images/bell_ic.svg';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="logo-group">
        <img src={logoImg} alt="로고" />
        <span className="brand-text">에어비앤짐</span>
      </div>
      <div className="bell-wrapper">
        <a href="/page/notification" className="notification-link">
          <img src={bellImg} alt="알림" className="notification-icon" />
        </a>
      </div>
    </div>
  );
}

export default TopBar;