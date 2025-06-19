import axios from "axios";
import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router";

// Dummy categories for demonstration
const categories = [
  "Electronics & Gadgets",
  "Home & Kitchen Appliances",
  "Fashion & Apparel",
  "Industrial Machinery & Tools",
  "Health & Beauty",
  "Automotive Parts & Accessories",
  "Office Supplies & Stationery",
];

const Edit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    image: "",
    name: "",
    brand_name: "",
    category: "",
    rating: "",
    price: "",
    short_description: "",
    main_quantity: "",
    minimum_selling_quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`https://pick-ns-hiip-serversite.vercel.app/products/${id}`) 
      .then((response) => {
        const product = response.data;
        setForm({
          image: product.image || "",
          name: product.name || "",
          brand_name: product.brand_name || "",
          category: product.category || "",
          rating: product.rating || "",
          short_description: product.short_description || "",
          main_quantity: product.main_quantity || "",
          minimum_selling_quantity: product.minimum_selling_quantity || "",
          price: product.price || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setError("Failed to load product data.");
        setLoading(false);
      });
    setLoading(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .patch(`https://pick-ns-hiip-serversite.vercel.app/products/${id}`, {
        ...form
      })
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        setSuccess("Product updated successfully!");
        setError("");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setError("Failed to update product.");
        setSuccess("");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-semibold text-black animate-pulse">
          Loading...
        </div>
      </div>
    );

  return (
    <div className="flex py-20 items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Edit Product
        </h2>
        {error && (
          <div className="mb-4 px-4 py-2 bg-red-100 border border-red-400 text-black rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-2 bg-green-100 border border-green-400 text-black rounded">
            {success}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Photo URL
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Brand Name
            </label>
            <input
              type="text"
              name="brand_name"
              value={form.brand_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
              min="0"
              step="0.01"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={form.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Description
            </label>
            <textarea
              name="short_description"
              value={form.short_description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Main Quantity
            </label>
            <input
              type="number"
              name="main_quantity"
              value={form.main_quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Minimum Selling Quantity
            </label>
            <input
              type="number"
              name="minimum_selling_quantity"
              value={form.minimum_selling_quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition duration-200 disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
