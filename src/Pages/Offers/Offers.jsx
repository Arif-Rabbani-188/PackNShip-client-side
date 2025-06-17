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
    <section className="py-12 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="w-10/12 mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Exclusive Offers & Services</h2>
            <p className="text-gray-500 mb-10">
                Take advantage of our exclusive deals and make your experience even
                better!
            </p>
            <div className="flex flex-wrap justify-center gap-8">
                {offersData.map((offer, idx) => (
                    <div
                        key={idx}
                        className={`${offer.bgColor} rounded-xl shadow-md p-8 min-w-[250px] max-w-xs flex-1`}
                    >
                        <div className="text-4xl mb-4">{offer.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">
                            {offer.title}
                        </h3>
                        <p className="text-gray-600">{offer.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
};

export default Offers;
