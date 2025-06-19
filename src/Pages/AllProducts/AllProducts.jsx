import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState("card"); // "card" or "table"

    useEffect(() => {
        fetch("https://pick-ns-hiip-serversite.vercel.app/products")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                    console.error("Unexpected data format:", data);
                }
            })
            .catch((error) => {
                setProducts([]);
                console.error("Error fetching products:", error);
            });
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mt-18 all-products-page py-10 px-20 mx-auto bg-gradient-to-br from-blue-50 to-white min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-blue-700 tracking-tight text-center drop-shadow-lg">
                Explore Our Products
            </h1>
            <div className="products-filter mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-80 px-5 py-3 border border-blue-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white transition"
                />
                <button
                    onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                >
                    {viewMode === "card" ? "Table View" : "Card View"}
                </button>
            </div>
            {viewMode === "card" ? (
                <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-blue-100 hover:shadow-2xl hover:scale-105 transition-transform duration-200"
                            >
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-52 w-full object-cover object-center bg-blue-50"
                                    />
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <h2 className="font-bold text-2xl mb-2 text-blue-800">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-500 mb-4 flex-1">
                                        {product.short_description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xl font-bold text-blue-600">
                                            {product.price} Taka
                                        </span>
                                        <Link
                                            to={`/allProducts/${product._id}`}
                                            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-blue-700">
                            <p className="text-lg font-medium">No products to display.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-black bg-white rounded-lg shadow">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-left">Image</th>
                                <th className="px-4 py-2 border-b text-left">Name</th>
                                <th className="px-4 py-2 border-b text-left">Description</th>
                                <th className="px-4 py-2 border-b text-left">Price</th>
                                <th className="px-4 py-2 border-b text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-blue-50">
                                        <td className="px-4 py-2 border-b">
                                            {product.image && (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-16 w-16 object-cover rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border-b">{product.name}</td>
                                        <td className="px-4 py-2 border-b">{product.short_description}</td>
                                        <td className="px-4 py-2 border-b">{product.price} Taka</td>
                                        <td className="px-4 py-2 border-b">
                                            <Link
                                                to={`/allProducts/${product._id}`}
                                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-blue-700">
                                        No products to display.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="pagination mt-12 flex justify-center"></div>
        </div>
    );
};

export default AllProducts;
