import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]); // Stores product data
  const [loading, setLoading] = useState(true); // Loading state for UX
  const [error, setError] = useState(null); // Error handling

  // useEffect runs once when component mounts (empty dependency array)
  useEffect(() => {
    fetchProducts();
  }, []);

  // Async function to fetch products from admin endpoint
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/allproduct/Admin');
      setProducts(response.data.product); // Update state with fetched products
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
      setLoading(false);
    }
  };

  // Delete product function - uses product ID
  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await api.delete(`/products/product/${productId}`);
      setProducts(products.filter(p => p._id !== productId)); // Remove from state
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete product');
    }
  };

  // Render loading state
  if (loading) return <div className="p-4">Loading products...</div>;
  
  // Render error state
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      
      {/* Products table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">${product.price}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">{product.countInStock}</td>
                <td className="px-4 py-2 border">
                  <button 
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}