import { createContext, useContext, useEffect, useState } from "react";
const LibraryContext = createContext(null);
export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bookspace:books") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("bookspace:books", JSON.stringify(books));
    } catch {
      /* Storage can be unavailable. */
    }
  }, [books]);
  function saveBook(book) {
    setBooks((prev) =>
      prev.some((b) => b.id === book.id)
        ? prev.map((b) => (b.id === book.id ? { ...b, ...book } : b))
        : [...prev, book],
    );
  }
  function removeBook(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }
  return (
    <LibraryContext.Provider value={{ books, saveBook, removeBook }}>
      {children}
    </LibraryContext.Provider>
  );
}
export const useLibrary = () => useContext(LibraryContext);
