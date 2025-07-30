import React, { useEffect, useState } from "react";

const mockUsers = [
  {
    $id: "user1",
    name: "Saurabh Sharma",
    email: "saurabhaasharma@gmail.com",
    status: "Admin",
  },
  {
    $id: "user2",
    name: "Ananya Gupta",
    email: "ananya123@gmail.com",
    status: "User",
  },
  {
    $id: "user3",
    name: "Rohit Kumar",
    email: "rohit.kumar@example.com",
    status: "User",
  },
];

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Later: Replace this with a backend API call
    setUsers(mockUsers);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-green-600 dark:text-green-300 mb-6">
        All Registered Users
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">User ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.$id} className="border-t dark:border-gray-700">
                <td className="px-6 py-4">{user.$id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
