import ProductCard from "./ProductCard";

export default function ProductList({ products, view, setEditProduct }) {
  if (products.length === 0) {
    return (
      <div className="empty">
        <p>No products found.</p>
      </div>
    );
  }

  if (view === "card") {
    return (
      <div className="grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            setEditProduct={setEditProduct}
          />
        ))}
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>₹{product.price}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>
              <button
                className="icon-btn"
                onClick={() => setEditProduct(product)}
              >
                ✏️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
