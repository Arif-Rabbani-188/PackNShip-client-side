import React, { useEffect, useState } from 'react';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleDetailClick = (id) => {
        // Navigate to the product detail page
        window.location.href = `/allProducts/${id}`;
    };

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
                    onChange={e => setSearch(e.target.value)}
                    className="w-full sm:w-80 px-5 py-3 border border-blue-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white transition"
                />
            </div>
            <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
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
                                <h2 className="font-bold text-2xl mb-2 text-blue-800">{product.name}</h2>
                                <p className="text-gray-500 mb-4 flex-1">{product.short_description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xl font-bold text-blue-600">{product.price} Taka</span>
                                    <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition" onClick={() => handleDetailClick(product._id)}>
                                        View Details
                                    </button>
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
            <div className="pagination mt-12 flex justify-center">
            </div>
        </div>
    );
};

export default AllProducts;
