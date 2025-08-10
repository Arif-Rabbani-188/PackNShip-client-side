import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../Loader/FullScreenLoader";

// Inline SVG fallback (no external domain -> avoids net::ERR_NAME_NOT_RESOLVED)
const FALLBACK_IMG = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
  <rect width='100%' height='100%' fill='%23f3f4f6'/>
  <text x='50%' y='50%' font-size='28' font-family='Arial, sans-serif'
        fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>
    No Image
  </text>
</svg>`.replace(/\n/g, "").replace(/#/g, "%23");

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    axios
      .get("https://pick-ns-hiip-serversite.vercel.app/products", {
        signal: controller.signal,
      })
      .then((res) => {
        if (ignore) return;
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data.reverse());
      })
      .catch((err) => {
        if (ignore || axios.isCancel(err)) return;
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(products.map((p) => p.category || "Uncategorized"))),
    ],
    [products]
  );

  const filtered = useMemo(
    () =>
      selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [products, selectedCategory]
  );

  const visibleProducts = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  if (loading) {
    return <FullScreenLoader text="Loading products..." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-2">
      <div className="w-11/12 mx-auto mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Products
        </h1>
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded text-center">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-3 underline"
            >
              Retry
            </button>
          </div>
        )}
        <div className="flex gap-2 mb-4 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              } font-semibold transition text-sm`}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(12);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.length === 0 && !error && (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
        {visibleProducts.map((product) => {
          const imgSrc = product.image || FALLBACK_IMG;
          return (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition border border-gray-100 flex flex-col"
              onClick={() => navigate(`/allProducts/${product._id}`)}
            >
              <div className="relative">
                <img
                  src={imgSrc}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3 bg-gray-100"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
                {product.category && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold mb-1 text-black truncate">
                {product.name}
              </h2>
              <p className="text-gray-500 mb-2 line-clamp-2 text-sm">
                {product.short_description || "No description"}
              </p>
              <div className="mt-auto">
                <p className="text-blue-600 font-semibold">
                  {product.price ? `${product.price} Taka` : "Price N/A"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < filtered.length && !loading && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            onClick={() => setVisibleCount((c) => c + 12)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
