import React from "react";

const offersData = [
  {
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over 1000Tk.",
    icon: "🚚",
    bgColor: "bg-cyan-50",
  },
  {
    title: "20% Off First Order",
    description: "Sign up and get 20% off your first purchase.",
    icon: "🎉",
    bgColor: "bg-pink-50",
  },
  {
    title: "24/7 Support",
    description: "Our team is here to help you anytime, anywhere.",
    icon: "💬",
    bgColor: "bg-purple-50",
  },
  {
    title: "Secure Packaging",
    description: "We ensure your items are packed safely and securely.",
    icon: "🔒",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days of delivery.",
    icon: "↩️",
    bgColor: "bg-orange-50",
  },
];

const Offers = () => {
return (
  <section className="py-16 min-h-screen flex items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
    {/* Decorative blurred shapes */}
    <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 opacity-30 rounded-full blur-3xl animate-pulse z-0"></div>
    <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-pink-300 via-blue-300 to-purple-300 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>
    <div className="w-10/12 mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 drop-shadow-xl tracking-tight">
        Our Exclusive Offers & Services
      </h2>
      <p className="text-gray-500 mb-10 text-lg">
        Take advantage of our exclusive deals and make your experience even better!
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {offersData.map((offer, idx) => (
          <div
            key={idx}
            className={`${offer.bgColor} rounded-2xl shadow-xl p-10 min-w-[250px] max-w-xs flex-1 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100 hover:border-blue-300 group cursor-pointer`}
          >
            <div className="text-5xl mb-4 animate-bounce group-hover:animate-none transition-all duration-300">
              {offer.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-700 group-hover:text-blue-600 transition-colors">
              {offer.title}
            </h3>
            <p className="text-gray-600 text-base">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
};

export default Offers;
