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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {products.map((p) => (
        <div key={p._id} className="card bg-base-100 shadow-sm">
          <figure className="aspect-square overflow-hidden bg-gray-900">
            <img
              src={Array.isArray(p.images) && p.images.length ? p.images[0] : "https://via.placeholder.com/400"}
              alt={p.name}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{p.name}</h2>
            <p className="truncate">{p.description}</p>
            <p>${p.price}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}