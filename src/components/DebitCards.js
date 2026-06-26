import './../App.css'; // Импорт стилей из корня
import { normalizeAssetUrl } from '../api';

const Debitcards = ({ title, bullets = [], image_url, link_url, cta_text }) => {
  return (
    <div className="card">
      {/* Блок для изображения */}
      <div className="card-image">
        <img src={normalizeAssetUrl(image_url)} alt={title} />
      </div>
      
      <div className="card-content-debit">
        {bullets.map((item, index) => (
          <p key={index} className={index === 0 ? 'card-content-debit-opis' : ''}>{item}</p>
        ))}
        <a href={link_url} target="_blank" rel="noopener noreferrer" className="btn-apply">{cta_text || 'ПОЛУЧИТЬ ДЕНЬГИ'}</a>
      </div>

      
    </div>
  );
};

export default Debitcards;
