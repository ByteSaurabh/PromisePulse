import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 dark:text-green-400 mb-10">
          Admin Dashboard
        </h1>

        {/* Grid of admin features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. View All Users */}
          <FeatureCard
            title="View All Users"
            description="Browse and manage all registered users."
            to="/admin/users"
          />

          {/* 2. View All Promises */}
          <FeatureCard
            title="All Promises"
            description="See every promise submitted by users."
            to="/admin/promises"
          />

          {/* 3. Delete Any User */}
          <FeatureCard
            title="User Management"
            description="Delete or disable user accounts."
            to="/admin/users-list"
          />

          {/* 4. Delete Any Promise */}
          <FeatureCard
            title="Promise Management"
            description="Remove invalid or abusive promises."
            to="/admin/promise-management"
          />

          {/* 5. Analytics Dashboard */}
          <FeatureCard
            title="Analytics & Reports"
            description="View trends, user growth, and submissions."
            to="/admin/analytics"
          />

          {/* 6. Create Announcements */}
          <FeatureCard
            title="Announcements"
            description="Post site-wide announcements visible to all users."
            to="/admin/announcements"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, to }) => (
  <Link to={to} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition border dark:border-gray-700">
    <h2 className="text-xl font-semibold text-green-600 dark:text-green-300 mb-2">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </Link>
);

export default AdminDashboard;
