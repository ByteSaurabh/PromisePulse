import React, { useEffect, useState, useContext } from "react";
import { database } from "../appwrite/Appwrite";
import { DATABASE_ID, COLLECTION_PROMISE_ID } from "../appwrite/constants";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const views = ["All", "Top Voted", "Region Wise", "My Contributions"];
const statuses = ["All", "Completed", "In Progress", "Pending"];

const Results = () => {
  const { sessionUser } = useContext(AuthContext);
  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewFilter, setViewFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  const fetchResults = async () => {
    try {
      const res = await database.listDocuments(DATABASE_ID, COLLECTION_PROMISE_ID);
      setPromises(res.documents);
    } catch (err) {
      console.error("Error loading results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const filteredResults = promises.filter((p) => {
    if (statusFilter !== "All" && p.status !== statusFilter.toLowerCase()) return false;
    if (viewFilter === "Top Voted" && p.votes < 5) return false;
    if (viewFilter === "My Contributions" && p.created_by !== sessionUser?.$id) return false;
    if (viewFilter === "Region Wise" && (!stateFilter || !districtFilter)) return false;
    if (stateFilter && p.state !== stateFilter) return false;
    if (districtFilter && p.district !== districtFilter) return false;
    if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const voteData = Object.values(
    filteredResults.reduce((acc, p) => {
      const key = `${p.state}-${p.district}`;
      acc[key] = acc[key] || { region: key, votes: 0 };
      acc[key].votes += p.votes || 0;
      return acc;
    }, {})
  );

  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-50 via-white to-green-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <h1 className="text-4xl font-bold text-center text-green-700 dark:text-green-300 mb-8">
        📊 Promise Result Dashboard
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setViewFilter(view)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              viewFilter === view
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-full text-xs transition ${
              statusFilter === status
                ? "bg-green-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded border shadow-sm w-64"
        />
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

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 mb-10">
        <h2 className="text-xl font-semibold text-center mb-4 text-green-700 dark:text-green-300">
          🔢 Regional Vote Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={voteData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <XAxis dataKey="region" angle={-20} interval={0} height={70} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="votes" fill="#34D399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Results Grid */}
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading Results...</p>
      ) : filteredResults.length === 0 ? (
        <p className="text-center text-gray-400 italic">No matching results found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map((res) => (
            <motion.div
              key={res.$id}
              whileHover={{ scale: 1.05, rotateY: 6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">{res.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">📍 {res.district}, {res.state}
              </p>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{res.description}</p>

              <div className="flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    res.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : res.status === "in-progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {res.status?.toUpperCase() || "PENDING"}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  🗳️ Votes: <strong>{res.votes || 0}</strong>
                </span>
              </div>

              {/* Gantt Style Timeline */}
              {res.created_at && (
                <div className="mt-4 text-xs text-gray-500">
                  Created: {format(new Date(res.created_at), "dd MMM yyyy")}
                </div>
              )}
              {res.status === "in-progress" && (
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full"
                    style={{ width: `${Math.min(res.votes * 10, 100)}%` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
