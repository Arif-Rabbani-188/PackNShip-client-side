import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(12);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://pick-ns-hiip-serversite.vercel.app/products")
            .then((res) => setProducts(res.data.reverse()))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    const categories = [
        "All",
        ...Array.from(new Set(products.map((p) => p.category || "Uncategorized"))),
    ];

    const filtered = selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    const visibleProducts = filtered.slice(0, visibleCount);

    return (
        <div className="bg-gray-50 min-h-screen py-20 px-2">
            <div className="w-11/12 mx-auto flex gap-2 mb-4 flex-wrap justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`px-4 py-2 rounded-full border ${
                            selectedCategory === cat
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        } font-semibold transition`}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setVisibleCount(12);
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition border border-gray-100"
                        onClick={() => navigate(`/allProducts/${product._id}`)}
                    >
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-3" />
                        <h2 className="text-lg font-bold mb-1 text-black">{product.name}</h2>
                        <p className="text-gray-500 mb-2">{product.category}</p>
                        <p className="text-blue-600 font-semibold">{product.price} Taka</p>
                    </div>
                ))}
            </div>
            {visibleCount < filtered.length && (
                <div className="flex justify-center mt-6">
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
