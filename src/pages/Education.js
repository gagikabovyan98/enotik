import React from 'react';
import Education from '../components/Education';
const Educ = ({ products = [] }) => {
  return (
    <div className="page">
      <div className="cards-grid">
        {products.map((item) => (
          <Education key={item.id || item.slug} {...item} />
        ))}
      </div>
      
    </div>
  );
};
export default Educ;
