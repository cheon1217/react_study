import React from "react";
function LockerError({ message }) {
  return <div className="error">{message || "보관소 정보를 불러오는데 실패했습니다."}</div>;
}
export default LockerError;