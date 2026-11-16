
import { useState } from 'react';

export default function BookCard({ book, children }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="card book-card">
      <div className="cover">
        {book.cover && !imageError ? (
          <img
            src={book.cover}
            alt={`Обкладинка: ${book.title}`}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <span aria-hidden="true">📖</span>
        )}
      </div>

      <div className="card-body">
        <h3>{book.title}</h3>

        <p className="muted">
          {book.author || 'Невідомий автор'}
        </p>

        {children && (
          <div className="actions">
            {children}
          </div>
        )}
      </div>
    </article>
  );
}
