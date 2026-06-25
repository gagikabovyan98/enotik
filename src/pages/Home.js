import React from 'react';
import Calculator from '../components/Calculator';
import ReviewsBlock from '../components/ReviewsBlock';
import headerBanner from '../images/header__banner.webp';
import ImageGallery from '../components/ImageGallery';
import { Link } from 'react-router-dom';

// Импортируем иконки из папки images
import KreditHistory from '../images/KreditHistory.png'; // 👈 Иконка для "Кредитная история"
import Monetka from '../images/monetka.png';       // 👈 Иконка для "Образование"
import Obrozovanie from '../images/obrozovanie.png';     // 👈 Иконка для "Букмейкеры"
import Kreditos from '../images/grafik.png';// 👈 Иконка для "Кредитный рейтинг"
import Rabota from '../images/rabota.png';// 👈 Иконка для "Вакансии"
import Debetcard from '../images/debetcard.png';// 👈 Иконка для "Дебетовые карты"



const Home = () => {
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
                    {/* Вставляем иконку перед текстом */}
                    <img src={KreditHistory} alt="Кредитная история" className="icon" />
                    <Link to="/"><h4>Кредитная история</h4></Link>
                    {/* <a href="https://nbki.ru/nbki-history" target="_blank" rel="noopener noreferrer">Перейти</a> */}
                  </div>
                  <div class="header__block-items-block">
                    <img src={Debetcard} alt="Образование" className="icon" />
                    <Link to="/Cards"><h4>Дебетовые карты</h4></Link>

                  </div>

                  <div class="header__block-items-block">
                    <img src={Obrozovanie} alt="Образование" className="icon" />
                    <Link to="/Education"><h4>Образование</h4></Link>

                  </div>
                  <div class="header__block-items-block">
                    <img src={Kreditos} alt="Кредитный рейтинг" className="icon" />
                    <Link to="/"><h4>Кредитный рейтинг</h4></Link>

                  </div>
                  <div class="header__block-items-block">
                    <img src={Monetka} alt="Букмейкеры" className="icon" />
                    <Link to="/"><h4>Букмейкеры</h4></Link>

                  </div>

                  <div class="header__block-items-block">
                    <img src={Rabota} alt="Образование" className="icon" />
                    <Link to="/Job"><h4>Вакансии</h4></Link>

                  </div>
                </div>
              </div>
            </section>
            <div className="App">
              <Calculator />
            </div>
          </section>
        </div>
        <ImageGallery />
        <section class="Reviews__block">
          <ReviewsBlock />
        </section>
      </div>
    </div>
  );
};

export default Home;