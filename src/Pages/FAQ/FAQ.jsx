import React from 'react';

const FAQ = () => {
    return (
        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-12 px-2">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-center mb-10 text-3xl font-bold text-[#2d3a4b] tracking-wide">
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
                        className="mb-5 rounded-lg bg-[#f5f8fa] shadow-md px-4 py-5 transition-shadow"
                    >
                        <summary className="font-semibold text-base text-[#1a2233] cursor-pointer outline-none py-1 transition-colors">
                            {item.q}
                        </summary>
                        <p className="mt-3 text-[#4b5a6a] text-base leading-relaxed">
                            {item.a}
                        </p>
                    </details>
                ))}
            </div>
        </div>
    );
};

export default FAQ;