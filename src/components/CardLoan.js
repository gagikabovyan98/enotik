import './../App.css'; // Импорт стилей из корня

const CardLoan = ({ bank, image, rate, term, sum, link }) => {
  return (
    <div className="card">
      {/* Блок для изображения */}
      <div className="card-image">
        <img src={image} alt={bank} />
      </div>
      
      <div className="card-content">
        <h3>{bank}</h3>
        <p><strong>Ставка:</strong> {rate}</p>
        <p><strong>Срок:</strong> {term}</p>
        <p><strong>Сумма:</strong> {sum}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-apply">Оформить</a>
      </div>
    </div>
  );
};

export default CardLoan;