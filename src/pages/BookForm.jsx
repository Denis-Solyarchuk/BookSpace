import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
function Form({ book }) {
  const { saveBook } = useLibrary();
  const navigate = useNavigate();
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [status, setStatus] = useState(book?.status || "want");
  const [error, setError] = useState("");
  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("Введіть назву та автора.");
      return;
    }
    saveBook({
      id: book?.id || `local-${crypto.randomUUID()}`,
      title: title.trim(),
      author: author.trim(),
      status,
      cover: book?.cover || "",
    });
    navigate("/library");
  }
  return (
    <>
      <h1>{book ? "Редагувати книгу" : "Додати книгу"}</h1>
      <form className="card form" onSubmit={submit}>
        <label>
          Назва
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
          />
        </label>
        <label>
          Автор
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            maxLength={200}
          />
        </label>
        <label>
          Колекція
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="want">Хочу прочитати</option>
            <option value="read">Прочитано</option>
          </select>
        </label>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <button>Зберегти</button>
        <Link to="/library">Скасувати</Link>
      </form>
    </>
  );
}
export default function BookForm() {
  const { id } = useParams();
  const { books } = useLibrary();
  const book = books.find((b) => b.id === id);
  if (id && !book)
    return (
      <p>
        Книгу не знайдено. <Link to="/library">До бібліотеки</Link>
      </p>
    );
  return <Form key={id || "new"} book={book} />;
}
