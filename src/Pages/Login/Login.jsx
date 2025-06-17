import React, { use } from 'react';
import { Authconext } from '../../Context/AuthContext/AuthContext';

const Login = () => {

    const {signInWithGoogle, signInWithEmail} = use(Authconext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmail(email, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-gradient-to-br from-blue-50 to-blue-100 px-2">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center gap-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2">Login</h2>
                <p className="text-gray-500 mb-4 text-center text-sm sm:text-base">Login to your PackNShip account</p>
                <form className="w-full flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="font-medium text-gray-700 text-sm sm:text-base">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="px-3 py-2 sm:px-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="font-medium text-gray-700 text-sm sm:text-base">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="px-3 py-2 sm:px-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 shadow-md transition-colors"
                    >
                        Login
                    </button>
                    <div className="flex items-center my-2">
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="mx-2 sm:mx-3 text-gray-400 text-xs sm:text-sm">or</span>
                        <div className="flex-grow h-px bg-gray-200"></div>
                    </div>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg font-semibold text-base text-gray-700 hover:bg-gray-50 shadow transition"
                        onClick={signInWithGoogle}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48">
                            <g>
                                <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.86-6.86C36.33 2.36 30.57 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.99 6.2C12.23 13.7 17.62 9.5 24 9.5z"/>
                                <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.41c-.54 2.91-2.18 5.38-4.66 7.04l7.19 5.59C43.97 37.36 46.1 31.46 46.1 24.55z"/>
                                <path fill="#FBBC05" d="M10.68 28.29A14.48 14.48 0 0 1 9.5 24c0-1.49.25-2.93.68-4.29l-7.99-6.2A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.69 10.47l7.99-6.18z"/>
                                <path fill="#EA4335" d="M24 48c6.57 0 12.09-2.17 16.12-5.91l-7.19-5.59c-2 1.34-4.56 2.13-8.93 2.13-6.38 0-11.77-4.2-13.62-10.09l-7.99 6.18C6.71 42.18 14.82 48 24 48z"/>
                                <path fill="none" d="M0 0h48v48H0z"/>
                            </g>
                        </svg>
                        <span className="text-xs sm:text-base">Continue with Google</span>
                    </button>
                </form>
                <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-2 gap-2 sm:gap-0">
                    <a href="#" className="text-blue-600 hover:underline text-xs sm:text-sm">
                        Forgot password?
                    </a>
                    <span className="hidden sm:inline text-gray-400">|</span>
                    <a href="/register" className="text-blue-600 hover:underline text-xs sm:text-sm">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;