import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
return (
    <section className="pt-16 md:pt-20 relative w-full h-[800px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <img
            src="https://i.ibb.co/7d92C2FT/Gemini-Generated-Image-7ayl847ayl847ayl.png"
            alt="Banner Background"
            className="absolute inset-0 w-full h-full object-cover opacity-60 animate-pulse"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-8">
            <div className="text-white max-w-xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
                    Accelerating <span className="text-blue-300">B2B Growth</span> with Smart Logistics
                </h1>
                <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
                    PackNShip is your trusted partner for seamless B2B logistics. We help businesses optimize supply chains, reduce operational costs, and build stronger connections with suppliers and distributors worldwide.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-400 flex items-center gap-2 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg text-lg">
                    Get started <span>
                        <FaArrowRight size={20} />
                    </span>
                </button>
            </div>
            <div className="hidden md:block ml-10">
                <img
                    src="https://i.ibb.co/7d92C2FT/Gemini-Generated-Image-7ayl847ayl847ayl.png"
                    alt="B2B Logistics"
                    className="w-[500px] h-[500px] object-cover rounded-2xl shadow-2xl border-4 border-white/30 animate-float"
                />
            </div>
        </div>
        <style>
            {`
                @keyframes float {
                    0% { transform: translateY(0px);}
                    50% { transform: translateY(-20px);}
                    100% { transform: translateY(0px);}
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}
        </style>
    </section>
);
};

export default Banner;
