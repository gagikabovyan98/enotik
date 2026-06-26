import './../App.css'; // Импорт стилей из корня
import { normalizeAssetUrl } from '../api';

const CardJob = ({ title, subtitle, image_url, link_url, cta_text }) => {
  return (
    <div className="card">
      {/* Блок для изображения */}
      <div className="card-image">
        <img src={normalizeAssetUrl(image_url)} alt={title} />
      </div>
      
      <div className="card-content">
        <h3>{title}</h3>
       
        <p class="card-content-job"><strong>Направление:</strong> {subtitle}</p>
        
        <a href={link_url} target="_blank" rel="noopener noreferrer" className="btn-apply">{cta_text || 'ОСТАВИТЬ ЗАЯВКУ'}</a>
      </div>
    </div>
  );
};

export default CardJob;
