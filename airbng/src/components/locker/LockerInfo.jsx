import React from "react";
function formatPhoneNumber(phone) {
  if (!phone) return '';
  const numbers = phone.replace(/\D/g, '');
  if (numbers.length === 11) return `${numbers.substring(0, 3)}-${numbers.substring(3, 7)}-${numbers.substring(7, 11)}`;
  if (numbers.length === 10) return `${numbers.substring(0, 3)}-${numbers.substring(3, 6)}-${numbers.substring(6, 10)}`;
  return phone;
}
function LockerInfo({ lockerDetail }) {
  if (!lockerDetail) return null;
  const fullAddress = `${lockerDetail.address} ${lockerDetail.addressDetail || ''}`.trim();
  return (
    <div className="info-section">
      <div className="info-item">
        <div className="info-label">주소</div>
        <div className="info-value">{fullAddress}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Address</div>
        <div className="info-value">{lockerDetail.addressEnglish}</div>
      </div>
      <div className="info-item">
        <div className="info-label">맡아주는 사람</div>
        <div className="info-value">{lockerDetail.keeperName}</div>
      </div>
      <div className="info-item">
        <div className="info-label">전화번호</div>
        <div className="info-value">{formatPhoneNumber(lockerDetail.keeperPhone)}</div>
      </div>
    </div>
  );
}
export default LockerInfo;