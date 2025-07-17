import React from 'react';
import backpackImg from '../../images/backpack_img.svg';
import carrierImg from '../../images/carrier_img.svg';
import boxImg from '../../images/box_img.svg';
import strollerImg from '../../images/stroller_img.svg';

const categories = [
    { img: backpackImg, label: '백팩/가방', price: '시간당 2,000원부터' },
    { img: carrierImg, label: '캐리어', price: '시간당 2,500원부터' },
    { img: boxImg, label: '박스/큰 짐', price: '시간당 4,000원부터' },
    { img: strollerImg, label: '유모차', price: '시간당 5,000원부터' },
];

function CategorySection() {
  return (
    <section className="category-section">
      <h3>어떤 짐을 보관하시나요?</h3>
      <div className="category-grid">
        {categories.map((cat, idx) => (
          <div className="category-card" key={idx}>
            <img src={cat.img} alt={cat.label} />
            <p>
              {cat.label}
              <br />
              <small>{cat.price}</small>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;