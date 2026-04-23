import React from 'react';
import CardJob from '../components/CardJob';
import dost from '../images/dost.png'; // Импортируем картинку
import yandex from '../images/yandex.png'; // Импортируем картинку
import yandex1 from '../images/yandex1.png'; // Импортируем картинку
import alfa from '../images/alfa.png'; // Импортируем картинку
import voxys from '../images/voxys.png'; // Импортируем картинку
import tin from '../images/tbank.png'; // Импортируем картинку
import domovenok from '../images/domovenok.png'; // Импортируем картинку




const Job = () => {
  const demoData = [
        {
      nameis: 'Партнёр "Яндекс-Маркет"',
      image: yandex,
      spec: 'Кладовщик',
      link: 'https://my.saleads.pro/s/p04u3?erid=2Vtzqw9y84u'
    },
    {
      nameis: 'Альфа Банк - Представитель банка',
      image: alfa,
      spec: 'Представитель',
      link: 'https://my.saleads.pro/s/ikryp?erid=2Vtzqwdp4vR'
    },
    {
      nameis: 'Работа в Т-Банке HR',
      image: tin,
      spec: 'Представитель',
      link: 'https://my.saleads.pro/s/zaoh6?erid=2VtzqubADhQ'
    },
    {
      nameis: 'Альфа Банк - Мобильный банкир HR',
      image: alfa,
      spec: 'Доставка',
      link: 'https://my.saleads.pro/s/8ds7i?erid=2Vtzqw87pcv'
    },
    {
      nameis: 'Альфа Банк - Привлечение клиентов',
      image: alfa,
      spec: 'Оператор',
      link: 'https://my.saleads.pro/s/573wq?erid=2Vtzqx51riH'
    },
    {
      nameis: 'Voxys HR',
      image: voxys,
      spec: 'Оператор',
      link: 'https://my.saleads.pro/s/wemed?erid=2VtzqwpNari'
    },
    {
      nameis: 'Домовёнок HR',
      image: domovenok,
      spec: 'Клининг',
      link: 'https://my.saleads.pro/s/cvpa5?erid=2VtzqvsLSU5'
    },
    {
      nameis: 'Альфа Банк - Альфа - Агент (DSA)  HR',
      image: alfa,
      spec: 'Продажи',
      link: 'https://my.saleads.pro/s/qyfdo?erid=2Vtzqw6dqLa'
    },
    {
      nameis: 'Яндекс Еда HR',
      image: yandex1,
      spec: 'Курьер',
      link: 'https://my.saleads.pro/s/vx0x7?erid=2VtzqwSDctu'
    },
    {
      nameis: 'Достависта',
      image: dost,
      spec: 'Курьер',
      link: 'https://my.saleads.pro/s/lmh0s?erid=2VtzqwA533u'
    },
    // Добавь еще как минимум до 20 объектов, чтобы заполнить страницу.
    // Используй разные цвета в ссылке placehold.co, чтобы визуально различать их.
    // Например:
    // image: 'https://placehold.co/350x160/a9a9a9/a9a9a9/png?text=МФО+4'
];

return (
  <div className="page">

    <div className="cards-grid">
      {demoData.map((item) => (
        <CardJob key={item.bank} {...item} /> /* Передаем все данные в компонент */
      ))}
    </div>
  </div>
);
};

export default Job;