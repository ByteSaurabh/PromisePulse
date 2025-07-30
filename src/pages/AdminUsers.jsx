import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'saurabhaasharma@gmail.com';

const mockUsers = [
  {
    $id: 'user1',
    name: 'Saurabh Sharma',
    email: 'saurabhaasharma@gmail.com',
    emailVerification: true,
  },
  {
    $id: 'user2',
    name: 'Ananya Gupta',
    email: 'ananya123@gmail.com',
    emailVerification: false,
  },
  {
    $id: 'user3',
    name: 'Rohit Kumar',
    email: 'rohit.kumar@example.com',
    emailVerification: true,
  },
];

const AdminUsers = () => {
  const { isAdmin, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) return navigate('/');
  if (!isAdmin) return navigate('/home');

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700 dark:text-white">
        👥 All Registered Users
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.$id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-6">{user.$id}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  {user.emailVerification ? (
                    <span className="text-green-600 font-semibold">Verified</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unverified</span>
                  )}
                </td>
                <td className="py-3 px-6">
                  {user.email === ADMIN_EMAIL ? 'Admin' : 'User'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
