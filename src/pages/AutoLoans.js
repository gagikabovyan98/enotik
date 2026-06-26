import React from "react";
import CardLoan from "../components/CardLoan";
const AutoLoans = ({ products = [] }) => {
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
export default AutoLoans;
