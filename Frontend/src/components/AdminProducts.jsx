import { useState, useEffect } from "react";
import api from "../utils/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [imageFiles, setImagesFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // create product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    images: ["https://via.placeholder.com/150"], // Changed to array as required by the Product model
  });
  const [updateProduct, setUpdateProduct] = useState({
    _id: "",
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    images: ["https://via.placeholder.com/150"],
  });
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

  const handleUpdateClick = (product) => {
    setUpdateProduct({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      images: Array.isArray(product.images) ? product.images : ["https://via.placeholder.com/150"],
    });
    setShowUpdateForm(true);
  };

  const handleUpdate = async () => {
    if (!updateProduct._id) {
      setError("Invalid product ID");
      return;
    }

    try {
      const response = await api.put(`/products/product/${updateProduct._id}`, updateProduct);
      if (response.data.message === "Product updated successfully") {
        fetchProducts();
        setShowUpdateForm(false);
        setError(null);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to update product"
      );
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
    if (!newProduct?.name || !newProduct?.description
      || !newProduct?.category || !newProduct?.price
      || !newProduct?.stock
    ) {
      setError("All fields are required");
      return;
    }
    if (!imageFiles.length) {
      setError("Please upload at least one image");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", newProduct.name);
      form.append("price", newProduct.price);
      form.append("description", newProduct.description);
      form.append("category", newProduct.category);
      form.append("stock", newProduct.stock);
      imageFiles.forEach((f) => form.append("images", f));

      const res = await api.post("/products/product", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.message === "Product created successfully") {
        setNewProduct({ name: "", description: "", category: "", price: 0, stock: 0, images: [] });
        setImagesFiles([]);
        fetchProducts();
        setError(null);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message
        || "Failed to create product");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-10 flex justify-center">
      <table className="size-30 drop-shadow-lg rounded-md w-full">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-black">
              <td className="px-6 py-4 text-left">{product.name}</td>
              <td className="px-6 py-4 text-left">{product.price}</td>
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
                  className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded mb-4"

                >
                  + Add Product
                </button>
                <button
                  onClick={() => handleUpdateClick(product)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImagesFiles(Array.from(e.target.files))}
                  className="border p-2 w-full mb-4"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-4 rounded shadow-lg w-[400px]">
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
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
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
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-4 rounded shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Update Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={updateProduct.description}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    description: e.target.value,
                  })
                }
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={updateProduct.category}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    category: e.target.value,
                  })
                }
                className="border p-2 w-full mb-2"
                required
              />

              <input
                type="number"
                placeholder="Stock"
                value={updateProduct.stock}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    stock: Number(e.target.value),
                  })
                }
                className="border p-2 w-full mb-4"
                required
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
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
