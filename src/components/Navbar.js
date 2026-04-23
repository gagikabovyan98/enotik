import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../images/logo.png'; // <-- НОВЫЙ ИМПОРТ
import './../App.css'; // Импорт стилей из корня проекта

const Navbar = () => {
  // Состояние для управления видимостью мобильного меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div class="navbar__logo-title">
        <h1 class="navbar__h1">ЕнотМани</h1>
        <Link to="/" className="logo">
          <img src={logoImage} alt="ЕнотМани Логотип" className="logo-img" />
        </Link>
      </div>


      {/* Бургер-кнопка для мобильных устройств */}
      <div
        className="burger"
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Переключает меню при клике
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Ссылки меню */}
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        {/* При клике на ссылку в мобильном меню, оно закрывается */}
        <Link to="/loans" onClick={() => setIsMenuOpen(false)}>Займы</Link>
        <Link to="/cards" onClick={() => setIsMenuOpen(false)}>Дебетовые карты</Link>
        <Link to="/consumer-loans" onClick={() => setIsMenuOpen(false)}>Потребительские кредиты</Link>
        <Link to="/auto-loans" onClick={() => setIsMenuOpen(false)}>Кредитные карты</Link>
        <Link to="/collateral-loans" onClick={() => setIsMenuOpen(false)}>Кредиты под залог</Link>
        <Link to="/Job" onClick={() => setIsMenuOpen(false)}>Вакансии</Link>
      </div>
    </nav>
  );
};

export default Navbar;