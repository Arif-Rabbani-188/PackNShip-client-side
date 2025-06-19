import React, { use, useState } from "react";
import { Authconext } from "../../Context/AuthContext/AuthContext";

const categories = [
    "Electronics & Gadgets",
    "Home & Kitchen Appliances",
    "Fashion & Apparel",
    "Industrial Machinery & Tools",
    "Health & Beauty",
    "Automotive Parts & Accessories",
    "Office Supplies & Stationery",
];

const AddProduct = () => {

    const {user} = use(Authconext);
    const [form, setForm] = useState({
        photoURL: "",
        name: "",
        mainQuantity: "",
        minSellingQuantity: "",
        brand: "",
        category: categories[0],
        shortDesc: "",
        price: "",
        rating: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here
        alert("Product submitted!");
    };

    return (
        <div className="max-w-7xl my-20 mx-auto p-4 sm:p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-black drop-shadow-sm tracking-tight">
                Add Product
            </h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-6"
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex-1 flex flex-col font-medium">
                        <span className="mb-1 text-black">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={user?.email || ""}
                            disabled
                            placeholder="Your Email"
                            className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base bg-gray-100 text-black cursor-not-allowed"
                        />
                    </label>
                    <label className="flex-1 flex flex-col font-medium">
                        <span className="mb-1 text-black">Name</span>
                        <input
                            type="text"
                            name="displayName"
                            value={user?.displayName || ""}
                            disabled
                            placeholder="Your Name"
                            className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base bg-gray-100 text-black cursor-not-allowed"
                        />
                    </label>
                </div>
                <label className="flex flex-col font-medium">
                    <span className="mb-1 text-black">Product Photo URL</span>
                    <input
                        type="url"
                        name="photoURL"
                        value={form.photoURL}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                        required
                    />
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex-1 flex flex-col font-medium">
                        <span className="mb-1 text-black">Name</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Product Title"
                            className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                            required
                        />
                    </label>
                    <label className="flex-1 flex flex-col font-medium">
                        <span className="mb-1 text-black">Brand Name</span>
                        <input
                            type="text"
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            placeholder="Brand Name"
                            className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                            required
                        />
                    </label>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex-1 flex flex-col font-medium">
                        <span className="mb-1 text-black">Main Quantity</span>
                        <input
                            type="number"
                            name="mainQuantity"
                            value={form.mainQuantity}
                            onChange={handleChange}
                            placeholder="Total Quantity"
                            className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                            min={1}
                            required
                        />
                    </label>
                    <label className="flex-1 flex flex-col font-medium">
                        <span className="mb-1 text-black">Min. Selling Quantity</span>
                        <input
                            type="number"
                            name="minSellingQuantity"
                            value={form.minSellingQuantity}
                            onChange={handleChange}
                            placeholder="Minimum Selling Quantity"
                            className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                            min={1}
                            required
                        />
                    </label>
                </div>
                <label className="flex flex-col font-medium">
                    <span className="mb-1 text-black">Category</span>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                        required
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col font-medium">
                    <span className="mb-1 text-black">Short Description</span>
                    <textarea
                        name="shortDesc"
                        value={form.shortDesc}
                        onChange={handleChange}
                        placeholder="Brief description"
                        className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base min-h-[70px] focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                        required
                    />
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex-1 flex flex-col font-medium">
                        <span className="mb-1 text-black">Price</span>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price per unit"
                            className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                            min={0}
                            step="0.01"
                            required
                        />
                    </label>
                    <label className="flex-1 flex flex-col font-medium">
                        <span className="mb-1 text-black">Rating</span>
                        <input
                            type="number"
                            name="rating"
                            value={form.rating}
                            onChange={handleChange}
                            placeholder="1-5"
                            className="mt-2 px-3 py-2 border border-blue-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-black"
                            min={1}
                            max={5}
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg py-3 font-bold text-lg mt-2 shadow-md transition-all duration-200"
                >
                    Add Product
                </button>
            </form>
            <div className="mt-8 sm:mt-10 bg-blue-50 p-4 sm:p-5 rounded-xl border border-blue-100 shadow-inner">
                <h4 className="font-semibold mb-2 text-black">Product Content</h4>
                <p className="text-black text-sm">
                    Please provide accurate and detailed information about your product.
                    High-quality images and clear descriptions help buyers make informed
                    decisions. Ensure your product meets our platform's wholesale
                    requirements.
                </p>
            </div>
        </div>
    );
};

export default AddProduct;
