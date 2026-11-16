export default function ItemCard({ item }) {
  return (
    <article className="card image-card" data-testid="image-card">
      <img src={item.url} alt={item.title} loading="lazy" />
      <div className="card-body">
        <h3>{item.title}</h3>
        <a href={item.source} target="_blank" rel="noreferrer">
          Джерело та ліцензія
        </a>
      </div>
    </article>
  );
}
