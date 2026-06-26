import React from 'react';
import CardJob from '../components/CardJob';
const Job = ({ products = [] }) => {
return (
  <div className="page">

    <div className="cards-grid">
      {products.map((item) => (
        <CardJob key={item.id || item.slug} {...item} />
      ))}
    </div>
  </div>
);
};

export default Job;
