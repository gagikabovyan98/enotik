import React, { useState } from 'react';

const PrivacyPolicyModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAccept = () => {
        if (isChecked) {
            closeModal();
            // Можно добавить сохранение согласия, например: localStorage.setItem('privacyAccepted', 'true');
        }
    };

    return (
        <div>
            {/* Кнопка, которая уже есть на сайте */}
            <button onClick={openModal} style={buttonStyle}>
                Политика конфиденциальности и персональных данных
            </button>

            {isModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h2 style={modalTitleStyle}>Политика конфиденциальности и персональных данных</h2>
                        <p style={modalTextStylep}>
                            <h5>1. Общие положения</h5>
                            <p class="text__style-p">1.1. Настоящая Политика конфиденциальности (далее — Политика) разработана в соответствии с Федеральным законом № 152-ФЗ «О персональных данных»</p>
                            <p>и определяет порядок обработки и защиты персональных данных пользователей сайта.</p>
                            <p>1.2. Оператором персональных данных является [Наименование организации/ИП], ИНН: [ИНН], ОГРН: [ОГРН], адрес: [юридический адрес], e-mail: [контактный e-mail]</p>
                            <h5>2. Какие данные собираются</h5>
                            <p>2.1. При использовании сайта собираются следующие персональные данные:</p>
                            <p>- фамилия, имя, отчество;</p>
                            <p>- контактный телефон;</p>
                            <p>- адрес электронной почты;</p>
                            <p>- иные данные, которые пользователь предоставляет добровольно (например, резюме при отклике на вакансию).</p>
                            <h5>3. Цели обработки данных</h5>
                            <p>3.1. Персональные данные используются для:</p>
                            <p>- предоставления информации о кредитных продуктах и микрозаймах;</p>
                            <p>- обработки заявок на вакансии;</p>
                            <p>- обратной связи с пользователями;</p>
                            <p>- рассылки рекламных и информационных материалов (с согласия пользователя);</p>
                            <p>- аналитики и улучшения работы сайта.</p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </p>
                        <label style={checkboxContainerStyle}>
                            <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} style={checkboxStyle}  />
                            <h1 style={checkboxLabelText}>Я ознакомился(ась) с политикой конфиденциальности</h1>
                        </label>
                        <button
                            onClick={handleAccept}
                            disabled={!isChecked}
                            style={{
                                ...acceptButtonStyle,
                                ...(isChecked ? {} : { opacity: 0.6, cursor: 'not-allowed' }),
                            }}
                        >
                            Принять
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Стили (адаптивные) ---

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
};

const  modalTextStylep = {
    fontSize:'12px',
};



const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: '#039318',
    padding: '25px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '95%',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

const modalTitleStyle = {
    marginTop: 0,
    marginBottom: '15px',
    fontSize: '6px',
    textAlign: 'center',
};



const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
    marginTop: '30px',
    gap: '30px',

};



const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '60px'
};

const checkboxLabelText = {
    fontSize: '1rem',
    
};

const acceptButtonStyle = {
    disabled: 'flex',
    marginLeft: '160px',
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    
};



export default PrivacyPolicyModal;