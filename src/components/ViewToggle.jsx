export default function ViewToggle({ view, setView }) {
  return (
    <div className="toggle">
      <button
        className={view === "list" ? "active" : ""}
        onClick={() => setView("list")}
      >
        List
      </button>
      <button
        className={view === "card" ? "active" : ""}
        onClick={() => setView("card")}
      >
        Cards
      </button>
    </div>
  );
}
