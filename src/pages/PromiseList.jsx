import React, { useEffect, useState } from "react";
import { database } from '../appwrite/Appwrite'; // 🔧 FIXED
import { DATABASE_ID, COLLECTION_PROMISE_ID } from "../appwrite/constants";

const PromiseList = () => {
  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchPromises = async () => {
    try {
      const res = await database.listDocuments(DATABASE_ID, COLLECTION_PROMISE_ID);
      setPromises(res.documents);
    } catch (err) {
      console.error("Failed to fetch promises:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromises();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-300 mb-8">
        📜 All Promises Made
      </h2>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promises.map((promise) => (
            <div
              key={promise.$id}
              className="bg-white dark:bg-gray-900 border border-green-200 dark:border-gray-700 shadow-lg rounded-lg p-5 hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-green-600 dark:text-green-300">{promise.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">📍 {promise.district}</p>
              <p className="text-gray-700 dark:text-gray-200 mt-3">{promise.description}</p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                🗳️ Votes: <span className="font-semibold">{promise.votes}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromiseList;
