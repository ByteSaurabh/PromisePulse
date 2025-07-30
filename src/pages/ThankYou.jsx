import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-100 to-green-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-10 text-center max-w-2xl w-full border border-green-200 dark:border-green-600">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-300 mb-4">🎉 Promise Created!</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Thank you for contributing to a better tomorrow. Your voice matters.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <button
            onClick={() => navigate('/promiselist')}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            View All Promises
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="mt-10 text-sm text-gray-600 dark:text-gray-400">
          <p>🔥 <span className="font-semibold">156 new promises</span> made today!</p>
          <p className="italic mt-2">"A small vote can lead to big changes."</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
