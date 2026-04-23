import React from "react";
import CardLoan from "../components/CardLoan";
import draiv from '../images/draiv.png'; // Импортируем картинку
import car from '../images/car.png'; // Импортируем картинку
import dobro from '../images/dobro.png'; // Импортируем картинку
import sovk from '../images/sov.png'; // Импортируем картинку
import tbank from '../images/tbank.png'; // Импортируем картинку

const CollateralLoans = () => {
 const demoData = [
     {
      bank: 'ДрайвЗайм - Залог ПТС',
      image: draiv, // Ссылка на картинку
      rate: 'До 9% в месяц',
      term: 'До 3 лет',
      sum: 'До 3 000 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=6864&p=10695&erid=2W5zFHwPkAU'
    },
     {
      bank: 'CarMoney - займ на карту до 1 млн',
      image: car, // Ссылка на картинку
      rate: 'До 129% годовых',
      term: 'До 48 месяцев',
      sum: 'До 1 000 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=6848&p=10695&erid=2W5zFJEsCvt'
    },
     {
      bank: 'Доброзайм - Выдача под залог ПТС',
      image: dobro, // Ссылка на картинку
      rate: '89% в год',
      term: 'До 5 лет',
      sum: 'До 1 000 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=6625&p=10695&erid=LjN8KZcbU'
    },
     {
      bank: 'Совкомбанк - под залог недвижимости',
      image: sovk, // Ссылка на картинку
      rate: 'До 20% годовых',
      term: 'До 180 месяцев',
      sum: 'До 30 000 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=6584&p=10695&erid=2W5zFGMBh6G'
    },
     {
      bank: 'Совкомбанк - под залог авто',
      image: sovk, // Ссылка на картинку
      rate: 'До 15% годовых',
      term: 'До 60 месяцев',
      sum: 'До 15 000 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=6221&p=10695&erid=2W5zFGGjjFE'
    },
     {
      bank: 'Т-Банк - Кредит под залог недвижимости',
      image: tbank, // Ссылка на картинку
      rate: 'До 32% годовых',
      term: 'до 15 лет',
      sum: 'до 30 000 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=4740&p=10695&erid=LjN8KFSkV'
    },
 ];

 return (
   <div className="page">

   <div className="cards-grid">
   {demoData.map((item) => (
   <CardLoan key={item.bank} {...item} />
   ))}
   </div>
   
 </div>
 );
};
export default CollateralLoans;