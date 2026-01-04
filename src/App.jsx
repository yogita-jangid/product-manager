import { useState, useEffect } from "react";
import { initialProducts } from "./data/initialProducts";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import ViewToggle from "./components/ViewToggle";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [editProduct, setEditProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  /* -------------------- SEARCH DEBOUNCE -------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* -------------------- THEME PERSISTENCE -------------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.dataset.theme = savedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme =
      document.body.dataset.theme === "dark" ? "light" : "dark";

    document.body.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  /* -------------------- FILTER + PAGINATION -------------------- */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container">
      {/* ---------- HEADER ---------- */}
      <header className="header" style={{ position: "relative" }}>
        <div className="title-wrap">
          <h1>Product</h1>
        </div>

        <p className="subtitle">Manage your products creatively</p>

        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          🌗
        </button>
      </header>

      {/* ---------- CONTROLS ---------- */}
      <div className="controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSearch("");
            }}
          />
        </div>

        <ViewToggle view={view} setView={setView} />
      </div>

      {/* ---------- INFO ---------- */}
      <p className="helper-text">
        Showing {filteredProducts.length} product(s)
      </p>

      {/* ---------- FORM ---------- */}
      <ProductForm
        products={products}
        setProducts={setProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />

      {/* ---------- LIST / CARDS ---------- */}
      <ProductList
        products={paginatedProducts}
        view={view}
        setEditProduct={setEditProduct}
      />

      {/* ---------- PAGINATION ---------- */}
      <Pagination
        total={filteredProducts.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;