import React from "react";
function LockerReserveButton({ lockerId, isAvailable, onReserve }) {
  return (
    <button
      className={`reserve-btn${isAvailable === 'NO' ? ' disabled' : ''}`}
      type="button"
      disabled={isAvailable === 'NO'}
      onClick={() => onReserve(lockerId)}
    >
      {isAvailable === 'NO' ? '이용 불가' : '예약하러 가기'}
    </button>
  );
}
export default LockerReserveButton;