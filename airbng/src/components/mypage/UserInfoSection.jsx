import React from "react";

function UserInfoSection({ nickname, email }) {
  return (
    <div className="user-info-section">
      <div className="user-profile">
        <div className="profile-image">
          <div className="profile-avatar"></div>
        </div>
        <div className="user-details">
          <h2 className="username">{nickname ? `${nickname}님` : "사용자님"}</h2>
          {email && <div className="user-email">{email}</div>}
        </div>
      </div>
    </div>
  );
}

export default UserInfoSection;