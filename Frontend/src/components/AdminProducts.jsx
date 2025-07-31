import { useState, useEffect } from "react";
import api from "../utils/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // create product
  useEffect(() => {
    fetchProducts();
  }, []);
  // admin create product


  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/allproduct/Admin");
      setProducts(response.data.product);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!productId) {
      setError("Invalid product ID");
      return;
    }

    try {
      const response = await api.delete(`/products/product/${productId}`);
      if (response.data.message === "Product deleted successfully") {
        setProducts(products.filter((product) => product._id !== productId));
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleCreate = async (products) => {
    if(!products) {
      setError("Invalid product")
    }
    if (!products.name || !products.description || products.category || products.stock) {
      console.error("All fields needs required!")
    }
    try {
      const response = await api.post("/users/products/Admin");
      if (response.data.message === "Products created successfully") {
        setProducts()
      }
    } catch (error) {
      setError(error.message)
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-10 flex justify-center">
      <table className="size-30 drop-shadow-lg rounded-md w-full">
        <thead className="bg-yellow-200">
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-200">
              <td className="px-6 py-4 text-left">{product.name}</td>
              <td className="px-6 py-4 text-left">{product.description}</td>
              <td className="px-6 py-4 text-left">{product.category}</td>
              <td className="px-6 py-4 text-left">{product.stock}</td>
              <td className="px-6 py-4 text-left">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleCreate(products)}
                  className="bg-green-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Create
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
