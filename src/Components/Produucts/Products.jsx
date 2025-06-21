import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const categoryColors = [
  "from-pink-400 to-pink-600",
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-yellow-400 to-yellow-600",
  "from-purple-400 to-purple-600",
  "from-indigo-400 to-indigo-600",
  "from-red-400 to-red-600",
  "from-teal-400 to-teal-600",
];

const Products = () => {
  const [productsWithCategory, setProductsWithCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

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
    ...Array.from(
      new Set(productsWithCategory.map((p) => p.category || "Uncategorized"))
    ),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? productsWithCategory
      : productsWithCategory.filter((p) => p.category === selectedCategory);

      const handleclick = (cat) => {
        navigate(`/catagories/${cat}`);
      }

  return (
    <section className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 py-16 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center mb-12 text-5xl font-extrabold text-black drop-shadow-2xl tracking-tight">
          Product Categories
        </h2>
        <nav className="flex flex-wrap justify-center gap-6 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => handleclick(cat)}
              className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105
                ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-600 scale-105"
                    : `bg-white text-gray-800 border-transparent hover:bg-gradient-to-r ${
                        categoryColors[idx % categoryColors.length]
                      } hover:text-white`
                }
              `}
            >
              {cat}
            </button>
          ))}
        </nav>
        
      </div>
    </section>
  );
};

export default Products;
