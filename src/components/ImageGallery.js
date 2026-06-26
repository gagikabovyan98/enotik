import React from 'react';
import './ImageGallery.css'; // Подключаем стили
import { normalizeAssetUrl } from '../api';

const ImageGallery = ({ items = [] }) => {
  const images = items.map((item) => ({
    id: item.id,
    title: item.title,
    src: normalizeAssetUrl(item.image_url),
  }));

  return (
    <div className="gallery-container">
      {/* Первый ряд: первые 3 картинки */}
      <div className="gallery-row">
        {images.slice(0, 3).map((item, index) => (
          <div key={item.id || index} className="gallery-item">
            <img src={item.src} alt={item.title || `Картинка ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Второй ряд: оставшиеся 3 картинки */}
      <div className="gallery-row">
        {images.slice(3, 6).map((item, index) => (
          <div key={item.id || index + 3} className="gallery-item">
            <img src={item.src} alt={item.title || `Картинка ${index + 4}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
