import { useState } from 'react';
import { Link } from 'react-router-dom';
import { normalizeAssetUrl } from '../api';
import './../App.css'; // Импорт стилей из корня проекта

const Navbar = ({ settings, navItems = [] }) => {
  // Состояние для управления видимостью мобильного меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div class="navbar__logo-title">
        <h1 class="navbar__h1">{settings?.site_name || 'ЕнотМани'}</h1>
        <Link to="/" className="logo">
          <img src={normalizeAssetUrl(settings?.logo_url || '/seed-assets/logo.png')} alt="ЕнотМани Логотип" className="logo-img" />
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
        {navItems.map((item) => (
          <Link key={item.id} to={item.path} onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
