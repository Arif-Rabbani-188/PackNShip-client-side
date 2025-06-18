import React, { useContext } from 'react';
import { Authconext } from '../../Context/AuthContext/AuthContext';

const Profile = () => {
    const { user, logOut } = useContext(Authconext);
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl mx-auto border border-blue-200">
            <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 blur-sm opacity-30"></div>
                    <div className="w-28 h-28 rounded-full bg-blue-200 flex items-center justify-center text-5xl font-extrabold text-white border-4 border-white shadow-lg overflow-hidden relative z-10">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            user?.displayName?.charAt(0)?.toUpperCase() || "U"
                        )}
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-1 text-gray-800">{user?.displayName || "User Name"}</h2>
                <p className="mb-6 text-gray-500">{user?.email || "user@example.com"}</p>
                <div className="w-full mt-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center bg-blue-50 rounded-lg px-4 py-2">
                            <span className="font-medium text-blue-700">Email:</span>
                            <span className="text-gray-700">{user?.email || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center bg-purple-50 rounded-lg px-4 py-2">
                            <span className="font-medium text-purple-700">Name:</span>
                            <span className="text-gray-700">{user?.displayName || "N/A"}</span>
                        </div>
                        {/* Add more profile fields here if needed */}
                    </div>
                </div>
                <div className="flex gap-4 mt-8">
                    <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:scale-105 transition-transform">
                        Edit Profile
                    </button>
                    <button
                        className="px-6 py-2 rounded-full bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 transition-colors"
                        onClick={logOut}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
);
};

export default Profile;