import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";

const Products = () => {
  const [productsWithCategory, setProductsWithCategory] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  React.useEffect(() => {
    axios
      .get("https://pick-ns-hiip-serversite.vercel.app/products")
      .then((response) => {
        const products = response.data;
        const productsWithCategory = products.map((product) => ({
          ...product,
          category: product.category || "Uncategorized",
        }));
        setProductsWithCategory(productsWithCategory.reverse());
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(productsWithCategory.map((p) => p.category))),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? productsWithCategory
      : productsWithCategory.filter((p) => p.category === selectedCategory);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-11/12 mx-auto">
        <h2 className="text-center mb-8 text-4xl font-bold text-black drop-shadow-xl">
          Featured Products
        </h2>

        <nav className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${
                selectedCategory === cat
                  ? "bg-green-600 text-white shadow"
                  : "bg-white text-gray-700 hover:bg-green-100"
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(8);
              }}
            >
              {cat}
            </button>
          ))}
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {visibleProducts.map((product, idx) => (
            <div
              key={product.id + "-" + idx}
              className="relative bg-white rounded-xl shadow-md p-6 text-center transition-transform duration-300 ease-[cubic-bezier(.4,2,.6,1)] hover:scale-105 hover:-translate-y-1 hover:shadow-xl animate-fadeInUp"
              style={{
                animationDelay: `${idx * 0.15 + 0.2}s`,
                animationFillMode: "both",
              }}
            >
              {product.bestDeal && (
                <span className="absolute left-4 top-4 bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-md z-10">
                  Best Deal
                </span>
              )}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover rounded-lg mb-4 shadow-sm transition-shadow duration-200"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                {product.name}
              </h3>
              <div className="mb-2 flex items-center justify-center gap-2">
                <span className="text-green-600 font-bold text-xl">
                  {product.price} Taka
                </span>
              </div>
              <div className="mt-4 flex justify-between flex-row-reverse gap-2">
                <Link
                  to={`/allProducts/${product._id}`}
                  className="px-6 py-2 bg-white border border-green-600 text-green-700 rounded-md font-bold text-base shadow-sm hover:bg-green-50 transition-colors duration-200"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              className="px-8 py-3 bg-green-600 text-white rounded-full font-bold text-lg shadow-md hover:bg-green-700 transition-colors duration-200"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}
        <style>
          {`
                                                @keyframes fadeInUp {
                                                        0% {
                                                                opacity: 0;
                                                                transform: translateY(40px);
                                                        }
                                                        100% {
                                                                opacity: 1;
                                                                transform: translateY(0);
                                                        }
                                                }
                                                .animate-fadeInUp {
                                                        animation-name: fadeInUp;
                                                        animation-duration: 0.7s;
                                                }
                                        `}
        </style>
      </div>
    </section>
  );
};

export default Products;
