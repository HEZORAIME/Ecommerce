import { useState, useEffect } from "react";
import api from "../utils/api";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/allproduct");
      setProducts(response.data.product);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <table className="flex flex-col">
      <thead>
        <tr className="flex flex-row">
          <th className="w-1/4">Product Name</th>
          <th className="w-1/4">Description</th>
          <th className="w-1/4">Category</th>
          <th className="w-1/4">Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr className="flex flex-row" key={product._id}>
            <td className="w-1/4">{product.name}</td>
            <td className="w-1/4">{product.description}</td>
            <td className="w-1/4">{product.category}</td>
            <td className="w-1/4">{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
