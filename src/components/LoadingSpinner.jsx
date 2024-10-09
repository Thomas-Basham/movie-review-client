import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 w-20 h-20 border-4 border-purple-300 rounded-full border-t-transparent animate-spin"></div>

        {/* Inner pulse */}
        <div className="absolute w-16 h-16 bg-pink-500 rounded-full inset-2 animate-ping"></div>

        {/* Central dot */}
        <div className="absolute w-8 h-8 bg-yellow-500 rounded-full inset-4"></div>
      </div>
    </div>
  );
}
