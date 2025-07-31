import React, { useEffect, useState, useContext } from "react";
import { database } from "../appwrite/Appwrite";
import { DATABASE_ID, COLLECTION_PROMISE_ID } from "../appwrite/constants";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const categories = ["All", "My Promises", "Others", "Top", "Completed", "In Progress"];

const PromiseList = () => {
  const { sessionUser } = useContext(AuthContext);
  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

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

  const filterPromises = () => {
    return promises.filter(p => {
      if (filterCategory === "My Promises" && p.created_by !== sessionUser?.$id) return false;
      if (filterCategory === "Others" && p.created_by === sessionUser?.$id) return false;
      if (filterCategory === "Top" && p.votes < 5) return false;
      if (filterCategory === "Completed" && p.status !== "completed") return false;
      if (filterCategory === "In Progress" && p.status !== "in-progress") return false;
      if (stateFilter && p.state !== stateFilter) return false;
      if (districtFilter && p.district !== districtFilter) return false;
      return true;
    });
  };

  const filteredPromises = filterPromises();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-800 dark:text-green-300">
        🌟 Explore Promises
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterCategory === cat
                ? "bg-green-600 text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* State and District Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Filter by State"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="px-3 py-2 rounded border shadow-sm"
        />
        <input
          type="text"
          placeholder="Filter by District"
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="px-3 py-2 rounded border shadow-sm"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading Promises...</p>
      ) : filteredPromises.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic">No promises found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPromises.map((promise) => (
            <motion.div
              key={promise.$id}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl p-6 transform transition duration-300"
            >
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">
                {promise.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">📍 {promise.district}, {promise.state}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200">{promise.description}</p>

              {/* Status & Votes */}
              <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {promise.status || "Pending"}
                </span>
                <span>🗳️ Votes: <strong>{promise.votes || 0}</strong></span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromiseList;
