import React, { useEffect, useState } from 'react';
import { FaLaptop, FaTshirt, FaMobileAlt, FaCouch, FaAppleAlt, FaBoxOpen } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const Catagories = () => {
    const [products, setProducts] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch('https://pick-ns-hiip-serversite.vercel.app/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const categoryIcons = {
        electronics: <FaLaptop className="text-3xl text-blue-500" />,
        clothing: <FaTshirt className="text-3xl text-blue-500" />,
        mobiles: <FaMobileAlt className="text-3xl text-blue-500" />,
        furniture: <FaCouch className="text-3xl text-blue-500" />,
        groceries: <FaAppleAlt className="text-3xl text-blue-500" />,
    };

    return (
        <div className="max-w-5xl mx-auto my-20 p-10 bg-gradient-to-br from-blue-50 to-purple-100 rounded-3xl shadow-2xl">
            <h2 className="text-center text-gray-900 mb-10 tracking-wide font-extrabold text-4xl drop-shadow-lg">
                Product Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[...new Set(products.map(product => product.category))].map(category => (
                    <Link
                        to={`/catagories/${category}`}
                        key={category}
                        className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center text-xl text-gray-700 font-semibold cursor-pointer transition-all duration-200 hover:bg-gradient-to-tr hover:from-purple-100 hover:to-blue-100 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 border border-gray-100"
                    >
                        <div className="mb-4 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center shadow-md">
                            {categoryIcons[category.toLowerCase()] || <FaBoxOpen className="text-3xl text-blue-500" />}
                        </div>
                        <span className="tracking-wide">{category}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Catagories;