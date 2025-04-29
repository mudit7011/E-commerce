import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { handleError } from "../utils.js";

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/product/get-products",
        {
          method: "GET",
        }
      );

      const result = await response.json();
      if (result.success) {
        setProducts(result.products || []);
      } else {
        handleError(result.message || "Failed to fetch products");
      }
    } catch (err) {
      handleError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate("/addProduct");
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
       
      </div>

      <h3 className="text-xl font-semibold mb-4">All Products</h3>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p>{product.description}</p>
              <p className="text-sm text-gray-500">₹{product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default DashboardPage;
