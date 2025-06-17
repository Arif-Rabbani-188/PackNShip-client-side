import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const Register = () => {
  const [form, setForm] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const photoURL = formData.get("photoURL");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!name || !email || !password) {
        Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields!',
      });
        return;
    }
    alert("Registered successfully!");
    const newForm = { name, photoURL, email, password, confirmPassword };
    setForm(newForm);
    console.log(newForm);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-indigo-700">
          Register
        </h2>
        <div className="mb-3 sm:mb-4">
          <label className="block mb-1 sm:mb-2 font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-3 sm:mb-4">
          <label className="block mb-1 sm:mb-2 font-medium text-gray-700">
            PhotoURL
          </label>
          <input
            type="text"
            name="photoURL"
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            placeholder="Your Photo URL"
          />
        </div>
        <div className="mb-3 sm:mb-4">
          <label className="block mb-1 sm:mb-2 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-3 sm:mb-4">
          <label className="block mb-1 sm:mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            placeholder="Password"
          />
        </div>
        <div className="mb-4 sm:mb-6">
          <label className="block mb-1 sm:mb-2 font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            placeholder="Confirm Password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md font-semibold text-base sm:text-lg hover:from-indigo-600 hover:to-purple-600 transition-colors"
        >
          Register
        </button>
        <p className="text-center mt-4 sm:mt-5 text-gray-500 text-sm sm:text-base">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
