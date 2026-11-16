import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">ТВОЯ ОСОБИСТА БІБЛІОТЕКА</p>
        <h1>Знайди свою наступну книгу.</h1>
        <p>
          Шукай книги, зберігай у власні колекції та відстежуй прогрес читання.
        </p>
        <Link className="button" to="/search">
          Почати пошук →
        </Link>
      </section>
      <div className="grid features">
        <article className="card card-body">
          <h2>01 · Пошук</h2>
          <p>Книжковий каталог Google Books.</p>
          <Link to="/search">Знайти книги</Link>
        </article>
        <article className="card card-body">
          <h2>02 · Колекції</h2>
          <p>Прочитано та хочу прочитати.</p>
          <Link to="/library">Моя бібліотека</Link>
        </article>
        <article className="card card-body">
          <h2>03 · Галерея</h2>
          <p>Фотографії бібліотек із Wikimedia Commons.</p>
          <Link to="/gallery">Переглянути</Link>
        </article>
      </div>
    </>
  );
}
