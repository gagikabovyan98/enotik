// src/components/BankTicker.js
import React, { useEffect, useRef } from 'react';
import './BankTicker.css'; // Мы обновим и CSS-файл тоже

const Ticker = ({ banks }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || banks.length === 0) return;

    const container = containerRef.current;
    const item = container.querySelector('.ticker-item');

    if (!item) return;

    // --- НОВАЯ ЛОГИКА ---
    // 1. Вычисляем ширину одного элемента (логотипа)
    const itemWidth = item.offsetWidth;
    // 2. Считаем общую ширину всех элементов + отступы
    const totalWidth = (itemWidth + 20) * banks.length; // 20px - это margin-right из CSS

    // 3. Устанавливаем ширину контейнера, чтобы все элементы выстроились в линию
    container.style.width = `${totalWidth}px`;

    // --- ОБНОВЛЕНИЕ: Убираем старую логику с setInterval ---
    // Теперь анимация управляется только через CSS

  }, [banks]); // Перезапускаем эффект, если изменился список банков

  return (
    <div className="ticker-container" ref={containerRef}>
      {banks.map((bank, index) => (
        <div key={index} className="ticker-item">
          <img src={bank.logo} alt={bank.name} title={bank.name} />
        </div>
      ))}
      {/* Дубликат нужен для зацикливания */}
      {banks.map((bank, index) => (
        <div key={`clone-${index}`} className="ticker-item">
          <img src={bank.logo} alt={bank.name} title={bank.name} />
        </div>
      ))}
    </div>
  );
};

export { Ticker as BankTicker };