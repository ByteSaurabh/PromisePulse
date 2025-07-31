import React, { useEffect, useState, useContext } from 'react';
import { database, Query } from '../appwrite/Appwrite';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MyAchievements = () => {
  const { sessionUser } = useContext(AuthContext);
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    try {
      const res = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ACHIEVEMENTS_COLLECTION_ID,
        [Query.equal('userId', sessionUser?.$id)]
      );
      setAchievements(res.documents);
    } catch (err) {
      console.error('Failed to fetch achievements:', err);
    }
  };

  useEffect(() => {
    if (sessionUser?.$id) {
      fetchAchievements();
    }
  }, [sessionUser]);

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-800">🏅 My Achievements</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <motion.div
              key={achievement.$id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 border border-yellow-200"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-yellow-800">{achievement.title}</h2>
                <p className="text-gray-700">{achievement.description}</p>
                <p className="text-sm text-gray-500">📅 {new Date(achievement.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">🏷️ Category: {achievement.category || 'General'}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No achievements found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAchievements;
