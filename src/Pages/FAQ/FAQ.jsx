import React from 'react';

const FAQ = () => {
    return (
        <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-16 relative overflow-hidden">
            {/* Decorative blurred shapes */}
            <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 opacity-30 rounded-full blur-3xl animate-pulse z-0"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-pink-300 via-blue-300 to-purple-300 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>
            <div className="w-full max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-10 relative z-10">
                <h2 className="text-center mb-10 text-4xl font-extrabold text-[#2d3a4b] tracking-wide drop-shadow-xl">
                    Frequently Asked Questions
                </h2>
                {[
                    {
                        q: "What is PackNShip?",
                        a: "PackNShip is a platform that helps you easily manage and track your shipments, making the shipping process seamless and efficient."
                    },
                    {
                        q: "How do I track my order?",
                        a: 'Simply log in to your account and navigate to the "My Orders" section to view real-time tracking information for your shipments.'
                    },
                    {
                        q: "Can I change my delivery address?",
                        a: "Yes, you can update your delivery address before your order is shipped. Go to your order details and click \"Edit Address\"."
                    },
                    {
                        q: "How do I contact customer support?",
                        a: "You can reach our support team via the \"Contact Us\" page or by emailing support@packnship.com."
                    }
                ].map((item, idx) => (
                    <details
                        key={idx}
                        className="mb-6 rounded-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-lg px-6 py-5 transition-shadow group border border-gray-100 hover:border-blue-300"
                        open={idx === 0}
                    >
                        <summary className="font-semibold text-lg text-[#1a2233] cursor-pointer outline-none py-2 transition-colors group-open:text-blue-600 group-open:font-bold">
                            {item.q}
                        </summary>
                        <p className="mt-3 text-[#4b5a6a] text-base leading-relaxed">
                            {item.a}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
};

export default FAQ;