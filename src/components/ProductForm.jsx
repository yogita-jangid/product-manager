import { useState, useEffect } from "react";

const emptyForm = {
  id: null,
  name: "",
  price: "",
  category: "",
  stock: "",
  description: ""
};

export default function ProductForm({
  products,
  setProducts,
  editProduct,
  setEditProduct
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editProduct) setForm(editProduct);
  }, [editProduct]);

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Name is required";
    if (!form.price) e.price = "Price is required";
    if (!form.category) e.category = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (form.id) {
      setProducts(products.map(p => (p.id === form.id ? form : p)));
      setEditProduct(null);
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }

    setForm(emptyForm);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{form.id ? "Edit Product" : "Add Product"}</h2>

      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      {errors.price && <span className="error">{errors.price}</span>}

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      {errors.category && <span className="error">{errors.category}</span>}

      <input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <textarea
        placeholder="Description (optional)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button type="submit">
        {form.id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
