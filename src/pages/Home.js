import React from 'react';
import { Link } from 'react-router-dom';
import Calculator from '../components/Calculator';
import headerBanner from '../images/header__banner.png'; // Импортируем картинку


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
            <div className="App">
              <Calculator />
            </div>
            <div class="btn__btn">
              <Link to="/Loans">
                <button class="App__btn">Оставить заявку на займ</button>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <footer class="footer">
        <div class="container">
          <div class="footer__content">
            <p>Сервис не занимается деятельностью по предоставлению банковских услуг и выдаче займов. </p>
            <p> Содержание сайта не является рекомендацией или офертой, вся информация носит ознакомительный характер.</p>
            <p> При использовании материалов гиперссылка на Енот Мани обязательна.</p>
          </div>

          <div class="footer__content-titile">
            <p>Мы используем файлы cookie, чтобы предоставить пользователям больше возможностей при посещении сайта Енот Мани</p>
             <p>Продолжая пользоваться сайтом, вы даёте согласие на использование cookie и обработку персональных данных.</p>
             <p>Условия использования <span>смотрите здесь.</span> </p> 
             <p>Оценивайте свои финансовые возможности и риски</p> 
          </div>

        </div>

      </footer>
    </div>


  );
};
export default Home;




