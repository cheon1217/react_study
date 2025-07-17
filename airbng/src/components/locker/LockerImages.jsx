import React from "react";
function LockerImages({ images }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="image-gallery">
      {images.slice(0, 6).map((img, idx) => (
        <img className="locker-image" src={img} alt={`보관소 이미지 ${idx + 1}`} key={idx} />
      ))}
    </div>
  );
}
export default LockerImages;