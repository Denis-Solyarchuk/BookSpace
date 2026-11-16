import { useState } from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import BookCard from "../components/BookCard";
export default function Library() {
  const { books, saveBook, removeBook } = useLibrary();
  const [filter, setFilter] = useState("all");
  const read = books.filter((b) => b.status === "read").length;
  const visible = books.filter((b) => filter === "all" || b.status === filter);
  return (
    <>
      <div className="heading">
        <h1>Моя бібліотека</h1>
        <Link className="button" to="/add">
          + Додати книгу
        </Link>
      </div>
      <div className="stats">
        <div>
          Усього<strong>{books.length}</strong>
        </div>
        <div>
          Прочитано<strong>{read}</strong>
        </div>
        <div>
          Хочу прочитати<strong>{books.length - read}</strong>
        </div>
      </div>
      <p>
        Прогрес читання:{" "}
        {books.length ? Math.round((read / books.length) * 100) : 0}%
      </p>
      <div className="reading-progress">
        <div
          className="reading-progress-fill"
          style={{
            width: `${books.length ? (read / books.length) * 100 : 0}%`,
          }}
        />
      </div>
      <label className="filter">
        Колекція{" "}
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Усі</option>
          <option value="want">Хочу прочитати</option>
          <option value="read">Прочитано</option>
        </select>
      </label>
      <div className="grid">
        {visible.map((book) => (
          <BookCard key={book.id} book={book}>
            <select
              aria-label={`Статус: ${book.title}`}
              value={book.status}
              onChange={(e) => saveBook({ ...book, status: e.target.value })}
            >
              <option value="want">Хочу прочитати</option>
              <option value="read">Прочитано</option>
            </select>
            <Link
              className="button secondary"
              to={`/edit/${encodeURIComponent(book.id)}`}
            >
              Редагувати
            </Link>
            <button className="secondary" onClick={() => removeBook(book.id)}>
              Видалити
            </button>
          </BookCard>
        ))}
      </div>
      {!visible.length && (
        <p className="muted">У цій колекції поки немає книг.</p>
      )}
    </>
  );
}
