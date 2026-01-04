export default function Pagination({
  total,
  perPage,
  currentPage,
  setCurrentPage
}) {
  const pages = Math.ceil(total / perPage);

  if (pages <= 1) return null;

  return (
    <div className="pagination">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
