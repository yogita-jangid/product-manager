export default function ProductCard({ product, setEditProduct }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{product.name}</h3>
        <span className="price">₹{product.price}</span>
      </div>

      <span className="badge">{product.category}</span>
      <p className="stock">Stock: {product.stock}</p>

      <button
        className="edit-btn"
        onClick={() => setEditProduct(product)}
      >
        ✏️ Edit
      </button>
    </div>
  );
}
