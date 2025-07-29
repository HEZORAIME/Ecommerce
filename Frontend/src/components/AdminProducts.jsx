import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/allproduct/Admin');
      setProducts(response.data.product);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='px-10 flex justify-center'>
      <table className='size-30 drop-shadow-lg rounded-md w-full'>
        <thead className="bg-yellow-200">
          <tr>
            <th>Product Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-200">
              <td className="">{product.name}</td>
              <td className="px-6 py-4 text-left">{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}