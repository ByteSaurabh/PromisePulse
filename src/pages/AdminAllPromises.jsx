import React, { useEffect, useState, useContext } from 'react';
import { database } from '../appwrite/Appwrite';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminAllPromises = () => {
  const { isAdmin, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Appwrite constants
  const DATABASE_ID = 'your-687f1cc40016fbef2543-id';  // replace with real
  const COLLECTION_ID = 'your-687f1d2d000fe5d153f8-id'; // replace with real

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    if (!isAdmin) {
      navigate('/home');
      return;
    }

    const fetchPromises = async () => {
      try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
        setPromises(response.documents);
      } catch (error) {
        console.error("Error fetching promises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromises();
  }, [isLoggedIn, isAdmin, navigate]);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700 dark:text-white">📋 All User Promises</h1>

      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-200">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {promises.map((promise) => (
                <tr key={promise.$id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6">{promise.user || 'Anonymous'}</td>
                  <td className="py-4 px-6">{promise.title}</td>
                  <td className="py-4 px-6">{promise.description}</td>
                  <td className="py-4 px-6">{new Date(promise.$createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllPromises;
