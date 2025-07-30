// src/pages/PromiseThankYou.jsx
import React from "react";
import { Link } from "react-router-dom";

const PromiseThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-center p-6">
      <h1 className="text-4xl font-extrabold text-green-600 mb-4">✅ Promise Submitted!</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 max-w-xl">
        Your campaign promise has been successfully recorded. Voters can now view and vote based on this.
      </p>
      <div className="flex gap-4">
        <Link to="/promise-list">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
            View All Promises
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PromiseThankYou;
