import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
    const navigate = useNavigate();
    return (
        <section className="pt-16 md:pt-20 relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 overflow-hidden">
            {/* Animated background shapes */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <img
                src="https://i.ibb.co/7d92C2FT/Gemini-Generated-Image-7ayl847ayl847ayl.png"
                alt="Banner Background"
                className="absolute inset-0 w-full h-full object-cover opacity-50 animate-pulse z-0"
            />
            <div className="absolute inset-0 bg-black/70 z-0"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-8">
                <div className="text-white max-w-xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">
                        Accelerating <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">B2B Growth</span> with <span className="text-pink-300">Smart Logistics</span>
                    </h1>
                    <p className="text-lg md:text-2xl mb-8 rounded-xl p-4">
                        PackNShip is your trusted partner for seamless B2B logistics. We help businesses optimize supply chains, reduce operational costs, and build stronger connections with suppliers and distributors worldwide.
                    </p>
                    <button
                        onClick={() => navigate("/allProducts")}
                        className="bg-gradient-to-r from-blue-600 to-purple-400 flex items-center gap-2 hover:from-blue-700 hover:to-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-xl text-lg transition-all duration-300 transform hover:scale-105">
                        Go to All Products <span>
                            <FaArrowRight size={20} />
                        </span>
                    </button>
                </div>
                <div className="hidden md:block ml-10">
                    <motion.img
                        src="https://i.ibb.co/7d92C2FT/Gemini-Generated-Image-7ayl847ayl847ayl.png"
                        alt="B2B Logistics"
                        className="w-[500px] h-[500px] object-cover rounded-2xl shadow-2xl border-4 border-white/30"
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;
