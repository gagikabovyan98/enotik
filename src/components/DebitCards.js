import './../App.css'; // Импорт стилей из корня

const Debitcards = ({ bank, opis, opis1, opis2, image, link }) => {
  return (
    <div className="card">
      {/* Блок для изображения */}
      <div className="card-image">
        <img src={image} alt={bank} />
      </div>
      
      <div className="card-content-debit">
        <h3>{bank}</h3>
        <p>{opis}</p>
        <p>{opis1}</p>
        <p>{opis2}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-apply">Оформить</a>
      </div>
    </div>
  );
};

export default Debitcards;