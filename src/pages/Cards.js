import React from 'react';
import CardLoan from '../components/DebitCards';
const Cards = ({ products = [] }) => {
  return (
    <div className="page">
      <div className="cards-grid">
        {products.map((item) => (
          <CardLoan key={item.id || item.slug} {...item} />
        ))}
      </div>
      
    </div>
  );
};
export default Cards;
