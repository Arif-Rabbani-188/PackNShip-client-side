import React, { useState } from 'react';

const Products = () => {
    const productsWithCategory = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: "$59.99",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
            discount: "20%",
            category: "Audio"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: "$99.99",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
            discount: "15%",
            category: "Wearables"
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: "$39.99",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            discount: "10%",
            category: "Audio"
        },
        {
            id: 4,
            name: "DSLR Camera",
            price: "$499.99",
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            discount: "25%",
            category: "Cameras"
        },
        {
            id: 5,
            name: "Bluetooth Speaker",
            price: "$39.99",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            discount: "0%",
            category: "Audio"
        },
        {
            id: 6,
            name: "Bluetooth Speaker",
            price: "$39.99",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            discount: "8%",
            category: "Audio"
        },
        {
            id: 7,
            name: "Bluetooth Speaker",
            price: "$39.99",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            discount: "12%",
            category: "Audio"
        }
    ];

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(productsWithCategory.map(p => p.category)))];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
        ? productsWithCategory
        : productsWithCategory.filter(p => p.category === selectedCategory);

    return (
        <section className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10">
            <div className="max-w-11/12 mx-auto">
                <h2 className="text-center mb-8 text-4xl font-bold text-black drop-shadow-xl">
                    Featured Products
                </h2>
      
                <nav className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${
                                selectedCategory === cat
                                    ? "bg-green-600 text-white shadow"
                                    : "bg-white text-gray-700 hover:bg-green-100"
                            }`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product, idx) => {
                        
                        let discountedPrice = null;
                        if (product.discount) {
                            const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ""));
                            const discountNum = parseFloat(product.discount.replace("%", ""));
                            discountedPrice = (priceNum * (1 - discountNum / 100)).toFixed(2);
                        }
                        return (
                            <div
                                key={product.id + '-' + idx}
                                className="relative bg-white rounded-xl shadow-md p-6 text-center transition-transform duration-300 ease-[cubic-bezier(.4,2,.6,1)] hover:scale-105 hover:-translate-y-1 hover:shadow-xl animate-fadeInUp"
                                style={{ animationDelay: `${idx * 0.15 + 0.2}s`, animationFillMode: 'both' }}
                            >

                                {product.bestDeal && (
                                    <span className="absolute left-4 top-4 bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-md z-10">
                                        Best Deal
                                    </span>
                                )}
                                {product.discount && product.discount != "0%" &&(
                                    <span className="absolute right-4 top-4 bg-green-600 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-md z-10">
                                        {product.discount} OFF
                                    </span>
                                )}
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-44 object-cover rounded-lg mb-4 shadow-sm transition-shadow duration-200"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-black">{product.name}</h3>
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    {discountedPrice && product.discount != "0%" ? (
                                        <div className='flex flex-col items-center gap-1'>
                                            <span className="text-gray-500 line-through text-base">{product.price}</span>
                                            <span className="text-green-600 font-bold text-xl">${discountedPrice}</span>
                                        </div>
                                    ) : (
                                        <span className="text-green-600 font-bold text-xl">{product.price}</span>
                                    )}
                                </div>
                                <button
                                    className="mt-4 px-6 py-2 bg-gradient-to-r from-green-600 to-gray-900 text-white rounded-md font-bold text-base shadow-md transition-transform duration-200 active:scale-95"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
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

export default Products;