import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    FaLaptop,
    FaTshirt,
    FaMobileAlt,
    FaCouch,
    FaAppleAlt,
    FaBoxOpen,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";

const Catagories = () => {
    const [productsWithCategory, setProductsWithCategory] = useState([]);
    useEffect(() => {
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

    return (
        <section className="py-24 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <div className="max-w-11/12 mx-auto">
                <h2 className="text-center mb-8 text-4xl font-bold text-black drop-shadow-xl">
                    Featured Products by Category
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
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {filteredProducts.map((product) => (
                            <Card
                                key={product._id || product.id}
                                product={product}
                                className="animate-fadeInUp"
                            />
                        ))}
                </div>
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

export default Catagories;
