import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Loading from "./Loading";
const params = new URLSearchParams({
  action: "query",
  generator: "search",
  gsrsearch: "intitle:library filetype:bitmap",
  gsrnamespace: "6",
  gsrlimit: "12",
  prop: "imageinfo",
  iiprop: "url",
  iiurlwidth: "480",
  format: "json",
  origin: "*",
});
const URL = `https://commons.wikimedia.org/w/api.php?${params}`;
export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const res = await fetch(URL, { signal: controller.signal });
        if (!res.ok) throw new Error("HTTP error");
        const data = await res.json();
        if (data.error) throw new Error("API error");
        const result = Object.values(data.query?.pages ?? {})
          .filter((p) => p.imageinfo?.[0]?.thumburl)
          .map((p) => ({
            id: p.pageid,
            title: p.title
              .replace(/^File:/, "")
              .replace(/\\.[^.]+$/, "")
              .replaceAll("_", " "),
            url: p.imageinfo[0].thumburl,
            source: p.imageinfo[0].descriptionurl,
          }));
        if (!controller.signal.aborted) setItems(result);
      } catch {
        if (!controller.signal.aborted) setError("Помилка завантаження даних");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [refresh]);
  function reload() {
    setLoading(true);
    setError("");
    setRefresh((n) => n + 1);
  }
  return (
    <section aria-label="Галерея зображень">
      <button onClick={reload} disabled={loading}>
        Оновити галерею
      </button>
      {loading ? (
        <Loading />
      ) : error ? (
        <p role="alert" className="notice error">
          {error}
        </p>
      ) : items.length ? (
        <div className="grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p>Зображень не знайдено.</p>
      )}
    </section>
  );
}
