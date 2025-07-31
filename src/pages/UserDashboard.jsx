import React, { useEffect, useState } from "react";
import { database } from "../appwrite/Appwrite";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DB_ID = "your-687f1cc40016fbef2543-id"; // replace with your Appwrite DB ID
const COLLECTION_ID = "your-687f2461002d927f086c-id"; // replace with your Collection ID

const UserDashboard = () => {
  const [promises, setPromises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromises = async () => {
      try {
        const res = await database.listDocuments(DB_ID, COLLECTION_ID, [
          Query.orderDesc("$createdAt"),
        ]);
        setPromises(res.documents);
      } catch (error) {
        console.error("Failed to fetch promises:", error);
      }
    };

    fetchPromises();
  }, []);

  const chartData = promises.reduce((acc, item) => {
    const date = new Date(item.$createdAt).toLocaleDateString();
    const entry = acc.find((x) => x.date === date);
    if (entry) {
      entry.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Total Promises</h2>
          <p className="text-4xl font-bold mt-2">{promises.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow col-span-2">
          <h2 className="text-xl font-semibold mb-4">Promise Activity</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🕒 Recent Promises</h2>
        <ul className="space-y-3">
          {promises.slice(0, 3).map((promise) => (
            <li
              key={promise.$id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow"
            >
              <p className="font-medium">{promise.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(promise.$createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/create")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ➕ Create New Promise
        </button> 
        <button
          onClick={() => navigate("/promiselist")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          📋 View All Promises
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
