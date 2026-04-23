import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [sum, setSum] = useState(100);
  const [days, setDays] = useState(1);
  const rate = 0.008; // 0.8% в день

  const interest = sum * rate * days;
  const total = sum + interest;

  return (
    <div className="calculator-container">
      <div className="input-group">
        <label>Сумма займа: {sum.toLocaleString('ru-RU')} ₽</label>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="100"
          value={sum}
          onChange={(e) => setSum(Number(e.target.value))}
          className="slider sum-slider"
        />
      </div>

      <div className="input-group">
        <label>Срок (дней): {days}</label>
        <input
          type="range"
          min="1"
          max="365"
          step="1"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="slider days-slider"
        />
      </div>

      <div className="results">
        <p>Сумма займа: {sum.toLocaleString('ru-RU')} ₽</p>
        <p>Срок: {days} дней</p>
        <p>Проценты: {interest.toFixed(2)} ₽</p>
        <p>Итого к погашению: {total.toLocaleString('ru-RU')} ₽</p>
      </div>
    </div>
  );
};

export default Calculator;