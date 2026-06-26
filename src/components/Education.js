import './../App.css'; // Импорт стилей из корня
import { normalizeAssetUrl } from '../api';

const Education = ({ title, image_url, link_url, cta_text }) => {
  return (
    <div className="card">
      {/* Блок для изображения */}
      <div className="card-image">
        <img src={normalizeAssetUrl(image_url)} alt={title} />
      </div>
      
      <div className="card-content">
        <div class="cart-content-napr">
          <p class="cart-content-naprav"><strong>Направление</strong></p>
          <p class="cart-content-naprav-p"><strong>{title}</strong></p>
          </div>

        <a href={link_url} target="_blank" rel="noopener noreferrer" className="btn-apply">{cta_text || 'ПОДРОБНЕЕ'}</a>
      </div>

      
    </div>
  );
};

export default Education;
