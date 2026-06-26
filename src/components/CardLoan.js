import './../App.css'; // Импорт стилей из корня
import { normalizeAssetUrl } from '../api';

const CardLoan = ({ title, image_url, rate, term, amount, link_url, cta_text }) => {
  return (
    <div className="card">
      {/* Блок для изображения */}
      <div className="card-image">
        <img src={normalizeAssetUrl(image_url)} alt={title} />
      </div>

      <div className="card-content">
        <div class="cart-content-sum">
          <p class="cart-content-sump"><strong>Сумма:</strong></p>
          <p class="cart-content-sum-p"><strong>{amount}</strong></p>
          </div>
        <div class="card-content-p">
          <div>
            <p><strong>Срок:</strong></p>
            <p><strong>Ставка:</strong></p>
          </div>
          <div>
            {/* <h3>{bank}</h3> */}
            <p>{rate}</p>
            <p>{term}</p>
          </div>
        </div>

        <a href={link_url} target="_blank" rel="noopener noreferrer" className="btn-apply">{cta_text || 'ПОЛУЧИТЬ ДЕНЬГИ'}</a>
      </div>
    </div>
  );
};

export default CardLoan;
