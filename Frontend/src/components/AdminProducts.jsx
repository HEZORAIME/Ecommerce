import { useState, useEffect } from "react";
import api from "../utils/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    stock: 0,
  });
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
  const handleCreate = async (newProduct) => {
    if (
      !newProduct ||
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.category ||
      !newProduct.stock
    ) {
      setError("All fields are required");
      return;
    }
    try {
      // Fixed API endpoint to match the backend route
      const response = await api.post("/users/products", newProduct);
      if (response.data.message === "Product created successfully") { // Fixed message to match backend response
        fetchProducts();
        setError(null);
        // Reset the form
        setNewProduct({
          name: "",
          description: "",
          category: "",
          stock: 0,
        });
      }
    } catch (error) {
      setError(error.message || "Failed to create product");
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
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
                >
                  + Add Product
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Create New Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate(newProduct);
                setShowForm(false); // close modal after create
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: Number(e.target.value),
                  })
                }
                className="border p-2 w-full mb-4"
                required
              />
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
                className="border p-2 w-full mb-2"
                required
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
