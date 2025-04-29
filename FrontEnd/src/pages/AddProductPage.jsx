import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils.js"; // assume you have this
import { useNavigate } from "react-router-dom";

function AddProductPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, category, stock } = product;

    if (!name || !description || !price || !category || !stock) {
      return handleError("All fields are required");
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/product/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // IMPORTANT for cookie-based token
        body: JSON.stringify(product),
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/dashboard"), 1500); // or wherever you want
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "description", "price", "category", "stock"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block capitalize mb-1">
              {field}
            </label>
            <input
              type={field === "price" || field === "stock" ? "number" : "text"}
              name={field}
              value={product[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddProductPage;