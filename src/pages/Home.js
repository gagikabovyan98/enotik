// src/pages/Home.js
import React from 'react';
import Calculator from '../components/Calculator';
import ReviewsBlock from '../components/ReviewsBlock';
import { BankTicker } from '../components/BankTicker'; // <-- Импортируем наш новый компонент
import headerBanner from '../images/header__banner.webp';
import tin from '../images/tbank.webp'; // Импортируем картинку
import mts from '../images/mts.webp'; // Импортируем картинку
import fora from '../images/fora.webp'; // Импортируем картинку
import ural from '../images/ural.webp'; // Импортируем картинку
import bspb from '../images/bspb.webp'; // Импортируем картинку



const Home = () => {

   // --- ВСТАВЬТЕ ЭТОТ БЛОК ЗДЕСЬ ---
   // Массив данных для бегущей строки. Логотипы должны быть доступны по URL.
   const banks = [

    { name: 'Сбер', logo: tin },
    { name: 'Сбер', logo: mts },
    { name: 'Сбер', logo: fora },
    { name: 'Сбер', logo: ural },
    { name: 'Сбер', logo: bspb },
    { name: 'Сбер', logo: ural },
    { name: 'Сбер', logo: bspb },
    { name: 'Сбер', logo: ural },

  

     
     



     // Чтобы добавить свой банк, скопируйте строку ниже и вставьте ее в массив:
     // { name: 'Название Банка', logo: '/images/your-logo.png' },
   ];
   // --- КОНЕЦ БЛОКА ДЛЯ ВСТАВКИ ---


   return (
     <div className="page">
       <div class="header__block">
         <div class="container">
           <div class="header__block-content">
             <div class="header__block-content-left">
               <h1 class="header__h1">БЫСТРЫЕ</h1>
               <h1 class="header__h2">ЗАЙМЫ НА КАРТУ</h1>
             </div>
             <div class="header__block-content-right">
               <img src={headerBanner} alt="headerBanner" className="headerBanner" />
             </div>
           </div>
           <section class="calculator__block">
             <section class="header__block-item">
               <div class="container">
                 <div class="header__block-items">
                   <div class="header__block-items-block">
                     <h4>Кредитная история</h4>
                     <a href="https://nbki.ru/nbki-history" target="_blank" rel="noopener noreferrer">Перейти</a>
                   </div>
                   <div class="header__block-items-block">
                     <h4>ФССП</h4>
                     <a href="https://fssp.gov.ru" target="_blank" rel="noopener noreferrer">Перейти</a>
                   </div>
                   <div class="header__block-items-block">
                     <h4>Кредитный рейтинг</h4>
                     <a href="https://fssp.gov.ru">Перейти</a> {/* Я исправил ссылку на заглушку */}
                   </div>
                   <div class="header__block-items-block">
                     <h4>Кредитный рейтинг</h4>
                     <a href="https://fssp.gov.ru">Перейти</a> {/* Я исправил ссылку на заглушку */}
                   </div>
                 </div>
               </div>
             </section>
             <div className="App">
               <Calculator />
             </div>
           </section>
          </div>

            <BankTicker banks={banks} />
           <section class="Reviews__block">
             <ReviewsBlock />
           </section>
         </div>
         
       </div>



   );
 };
 
 export default Home;