import React from 'react';
import { useNavigate } from 'react-router';

const Card = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/allProducts/${product._id}`);
    };

    return (
        <div className="flex justify-center items-center">
            <div
                className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center transition-transform w-80 h-[580px] min-h-[520px]"
            >
                <img
                    src={product.image}
                    className="w-full h-44 object-cover rounded-xl mb-4 shadow"
                    alt={product.name}
                />
                <h2 className="mb-2 text-xl font-bold text-slate-900 text-center">{product.name}</h2>
                <div className="flex gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-600 rounded px-3 py-0.5 text-sm">{product.brand_name}</span>
                    <span className="bg-blue-100 text-blue-600 rounded px-3 py-0.5 text-sm">{product.category}</span>
                </div>
                <p className="mb-3 text-slate-600 text-center text-base">{product.short_description}</p>
                <div className="w-full flex flex-col gap-1.5 text-base flex-1">
                    <span>
                        <strong className="text-blue-600">৳{product.price}</strong>
                        <span className="text-slate-400 font-normal ml-1">Price</span>
                    </span>
                    <span>
                        <strong className="text-green-600"></strong>
                        <span className="text-slate-400 font-normal"> {product.main_quantity} Available</span>
                    </span>
                    <span>
                        <strong className="text-orange-500">{product.minimum_selling_quantity}</strong>
                        <span className="text-slate-400 font-normal ml-1">Min. Order</span>
                    </span>
                    <span>
                        <strong className="text-yellow-400">{product.rating}</strong>
                        <span className="text-slate-400 font-normal ml-1">Rating</span>
                        <span role="img" aria-label="star">⭐</span>
                    </span>
                </div>
                <button
                    onClick={handleClick}
                    className="mt-auto py-2 w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white border-none rounded-lg font-semibold text-base cursor-pointer shadow transition-colors hover:from-blue-700 hover:to-blue-800"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default Card;
