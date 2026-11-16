import { useEffect, useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
export default function Search() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [request, setRequest] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { books: saved, saveBook } = useLibrary();
  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    async function load() {
      try {
        const p = new URLSearchParams({
          q: query,
          maxResults: "24",
          printType: "books",
        });
        const key = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
        if (key) p.set("key", key);
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?${p}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const result = (data.items ?? []).map((b) => ({
          id: b.id,
          title: b.volumeInfo.title || "Без назви",
          author: b.volumeInfo.authors?.join(", ") || "",
          cover:
            b.volumeInfo.imageLinks?.thumbnail?.replace(/^http:/, "https:") ||
            "",
        }));
        if (!controller.signal.aborted) setBooks(result);
      } catch (e) {
        if (!controller.signal.aborted)
          setError(
            `Помилка завантаження даних (${e.message}). Перевірте API-ключ або повторіть запит.`,
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [query, request]);
  function submit(e) {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    setLoading(true);
    setError("");
    setQuery(value);
    setRequest((n) => n + 1);
  }
  return (
    <>
      <h1>Пошук книг</h1>
      <form className="search" onSubmit={submit}>
        <label className="sr-only" htmlFor="query">
          Назва або автор
        </label>
        <input
          id="query"
          placeholder="Назва книги або автор..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button disabled={loading}>Знайти</button>
      </form>
      {loading ? (
        <Loading />
      ) : error ? (
        <p role="alert" className="notice error">
          {error}
        </p>
      ) : query ? (
        <div className="grid">
          {books.length ? (
            books.map((book) => (
              <BookCard key={book.id} book={book}>
                <button
                  disabled={saved.some((b) => b.id === book.id)}
                  onClick={() => saveBook({ ...book, status: "want" })}
                >
                  {saved.some((b) => b.id === book.id)
                    ? "У бібліотеці"
                    : "+ Хочу прочитати"}
                </button>
              </BookCard>
            ))
          ) : (
            <p>Книг не знайдено.</p>
          )}
        </div>
      ) : (
        <p className="muted">Введіть назву або автора для пошуку.</p>
      )}
    </>
  );
}
