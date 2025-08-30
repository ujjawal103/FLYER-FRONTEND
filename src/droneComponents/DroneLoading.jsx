// Loading.jsx
import React from "react";

export default function DroneLoading({ message }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Loader */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Message from parent */}
        <p className="mt-4 text-lg font-medium text-white animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
