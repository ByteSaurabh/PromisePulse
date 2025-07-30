// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "📝 Create Promise",
    description: "Let users vote on your new campaign promises.",
    path: "/promise-create",
  },
  {
    title: "📜 View Promises",
    description: "Browse promises made in your district.",
    path: "/promise-list",
  },
  {
    title: "📊 View Results",
    description: "Visualize poll results using graphs.",
    path: "/results",
  },
  {
    title: "📂 My Dashboard",
    description: "Manage your created promises and profile.",
    path: "/user-dashboard",
  },
  {
    title: "🧑‍💼 Admin Panel",
    description: "Moderate content, view analytics and manage users.",
    path: "/admin",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome to <span className="text-green-600">PromisePulse</span> 👋
        </h1>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
          Empower your community by tracking campaign promises, participating in polls,
          and holding leaders accountable. Let's build transparency together.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              onClick={() => navigate(feature.path)}
              className="cursor-pointer bg-white dark:bg-gray-800 hover:shadow-lg p-6 rounded-lg transition-all border border-gray-200 dark:border-gray-700 hover:scale-[1.02]"
            >
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
