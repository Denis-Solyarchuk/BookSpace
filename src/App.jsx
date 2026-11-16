import { NavLink, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Gallery from "./pages/Gallery";
import BookForm from "./pages/BookForm";
export default function App() {
  return (
    <>
      <header>
        <nav>
          <Link className="brand" to="/">
            ▤ BookSpace
          </Link>
          <div className="nav-links">
            <NavLink end to="/">
              Головна
            </NavLink>
            <NavLink to="/search">Пошук</NavLink>
            <NavLink to="/library">Бібліотека</NavLink>
            <NavLink to="/gallery">Галерея</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
          <Route
            path="*"
            element={
              <p>
                Сторінку не знайдено. <Link to="/">На головну</Link>
              </p>
            }
          />
        </Routes>
      </main>
      <footer>BookSpace · React SPA · Google Books / Wikimedia Commons</footer>
    </>
  );
}
