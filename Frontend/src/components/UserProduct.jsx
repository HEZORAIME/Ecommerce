import { useState, useEffect } from "react";
import api from "../utils/api";
import razorbladeImg from "../assets/Keyboard/razorblade.jpg";
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
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={razorbladeImg} alt={products[0]?.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{products[0]?.name}</h2>
        <p>{products[0]?.description}</p>
        <p>{products[0]?.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}