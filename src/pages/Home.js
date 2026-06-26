import React from 'react';
import Calculator from '../components/Calculator';
import ReviewsBlock from '../components/ReviewsBlock';
import ImageGallery from '../components/ImageGallery';
import { Link } from 'react-router-dom';
import { normalizeAssetUrl } from '../api';

const Home = ({ settings, homeFeatures = [], galleryItems = [], reviews = [] }) => {
  return (
    <div className="page">
      <div class="header__block">
        <div class="container">
          <div class="header__block-content">
            <div class="header__block-content-left">
              <h1 class="header__h1">{settings?.hero_title || 'БЫСТРЫЕ'}</h1>
              <h1 class="header__h2">{settings?.hero_subtitle || 'ЗАЙМЫ НА КАРТУ'}</h1>
            </div>
            <div class="header__block-content-right">
              <img src={normalizeAssetUrl(settings?.hero_image_url || '/seed-assets/header__banner.webp')} alt="headerBanner" className="headerBanner" />
            </div>
          </div>
          <section class="calculator__block">
            <section class="header__block-item">
              <div class="container">
                <div class="header__block-items">
                  {homeFeatures.map((item) => (
                    <div key={item.id} class="header__block-items-block">
                      <img src={normalizeAssetUrl(item.image_url)} alt={item.alt_text || item.title} className="icon" />
                      <Link to={item.path}><h4>{item.title}</h4></Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <div className="App">
              <Calculator />
            </div>
          </section>
        </div>
        <ImageGallery items={galleryItems} />
        <section class="Reviews__block">
          <ReviewsBlock reviews={reviews} />
        </section>
      </div>
    </div>
  );
};

export default Home;
