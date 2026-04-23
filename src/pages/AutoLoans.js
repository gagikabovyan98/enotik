import React from "react";
import CardLoan from "../components/CardLoan";
import zaimerkart from '../images/zaimerkarta.png'; // Импортируем картинку
import bars from '../images/bars.png'; // Импортируем картинку
import rus from '../images/rus.png'; // Импортируем картинку
import ural from '../images/ural.png'; // Импортируем картинку
import halva from '../images/halva.png'; // Импортируем картинку
import tin from '../images/tbank.png'; // Импортируем картинку


const AutoLoans = () => {
 const demoData = [
     {
      bank: 'Займер - Виртуальная карта',
      image: zaimerkart, // Ссылка на картинку
      rate: '0,65% в день',
      term: 'До 180 дней',
      sum: 'До 100 000 рублей',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=6736&p=10695&erid=2W5zFGNo5ep'
    },
     {
      bank: 'АК Барс - Кредитная карта 115 дней',
      image: bars, // Ссылка на картинку
      rate: 'До 115 дней без %',
      term: 'До 5 лет',
      sum: 'До 1 000 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=6474&p=10695&erid=2W5zFHxn2e4'
    },
     {
      bank: 'Русский Стандарт Банк - Кредитка',
      image: rus, // Ссылка на картинку
      rate: 'До 59% годовых',
      term: 'До 5 лет',
      sum: 'До 1 000 000 ₽',
      link: 'https://go.leadgid.ru/aff_c?aff_id=145356&offer_id=6460&p=10695&erid=2W5zFH3N6JD'
    },
     {
      bank: 'Уралсиб Банк - Кредитная карта',
      image: ural, // Ссылка на картинку
      rate: 'От 34,9% годовых',
      term: 'До 5 лет',
      sum: 'До 5 000 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=5567&p=10695&erid=2W5zFJjKetp'
    },
     {
      bank: 'Халва - Карта рассрочки',
      image: halva, // Ссылка на картинку
      rate: 'До 15% годовых',
      term: 'До 7 лет',
      sum: 'До 100 000 ₽',
      link: 'https://fin-lg.com/aff_c?aff_id=145356&offer_id=2413&p=10695&erid=LjN8KTAzF'
    },
     {
      bank: 'Т-Банк — кредитная карта Drive',
      image: tin, // Ссылка на картинку
      rate: 'До 62% годовых',
      term: '5 лет',
      sum: 'До 1 000 000 ₽',
      link: 'https://my.saleads.pro/s/ounml?erid=2VtzqvRynmt'
    },
     {
      bank: 'Т-Банк — кредитная карта Drive',
      image: tin, // Ссылка на картинку
      rate: 'До 62% годовых',
      term: '5 лет',
      sum: 'До 1 000 000 ₽',
      link: 'https://my.saleads.pro/s/8dski?erid=2Vtzqw6fAWA'
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
export default AutoLoans;