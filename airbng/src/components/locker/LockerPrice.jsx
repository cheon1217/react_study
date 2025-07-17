import React from "react";
function LockerPrice({ jimTypeResults }) {
  if (!jimTypeResults || jimTypeResults.length === 0) {
    return (
      <div className="price-info">
        <div className="price-title">가격 정보 없음</div>
        <div className="price-detail">• 가격 정보를 확인할 수 없습니다.</div>
      </div>
    );
  }
  const typeNames = jimTypeResults.map(type => type.typeName).join('/');
  return (
    <div className="price-info">
      <div className="price-title">{typeNames}</div>
      <div className="price-detail">
        {jimTypeResults.map(type => (
          <div key={type.typeName}>
            • {type.typeName}: 시간당 {type.pricePerHour.toLocaleString()}원
          </div>
        ))}
        <div>• 강남역 도보 3분</div>
      </div>
    </div>
  );
}
export default LockerPrice;