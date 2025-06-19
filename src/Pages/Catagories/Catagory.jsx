import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Catagory = () => {
    const { catagory } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://pick-ns-hiip-serversite.vercel.app/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error))
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = products.filter(
        product => (product.category || 'Uncategorized') === catagory
    );

    const handleDetailClick = (id) => {
        // Navigate to the product detail page
        window.location.href = `/allProducts/${id}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-8 text-4xl font-extrabold text-gray-800 text-center tracking-tight capitalize drop-shadow-lg">
                    {catagory}
                </h2>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg py-20">
                        No products found in this category.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center border border-gray-100"
                            >
                                <div className="w-full h-40 flex items-center justify-center mb-4">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="max-h-36 object-contain rounded-lg shadow"
                                        />
                                    ) : (
                                        <div className="w-full h-36 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">
                                    {product.name}
                                </h3>
                                <p className="text-purple-600 font-bold text-lg mb-2">
                                    {product.price ? `${product.price} Taka` : 'Contact for price'}
                                </p>
                                <button
                                onClick={() => handleDetailClick(product._id)}
                                 className="mt-auto px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium shadow transition">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catagory;
