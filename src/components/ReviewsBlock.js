// src/components/ReviewsBlock.js
import React from 'react';
import styles from './ReviewsBlock.module.css'; // Импортируем стили
import { normalizeAssetUrl } from '../api';

// Компонент теперь содержит в себе и карточку
function ReviewsBlock({ reviews = [] }) {
  return (
    <section className={styles.reviewsSection}>
      <h2 className={styles.title}>Отзывы наших клиентов</h2>
      <div className={styles.reviewsContainer}>
        {reviews.map((review, index) => (
          <div key={review.id || index} className={styles.reviewCard}>
            <img src={normalizeAssetUrl(review.avatar_url)} alt={review.name} className={styles.avatar} />
            <div>
              <h4 className={styles.name}>{review.name}</h4>
              <p className={styles.reviewText}>{review.review_text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReviewsBlock;
