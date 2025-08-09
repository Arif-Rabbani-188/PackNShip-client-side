import React from 'react';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative flex flex-col items-center gap-6">
        <div className="w-20 h-20 relative">
          <div className="absolute inset-0 rounded-full border-4 border-purple-300 border-t-purple-600 animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-4 border-blue-200 border-b-blue-500 animate-[spin_1.2s_linear_reverse_infinite]"></div>
          <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 opacity-20 animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Loading your experience
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
