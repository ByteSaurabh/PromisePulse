import React, { useEffect, useState, useContext } from 'react';
import { database, Query } from '../appwrite/Appwrite';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MyReviews = () => {
  const { sessionUser } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID,
        [Query.equal('userId', sessionUser?.$id)]
      );
      setReviews(res.documents);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    if (sessionUser?.$id) {
      fetchReviews();
    }
  }, [sessionUser]);

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-green-50 to-green-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">🌟 My Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <motion.div
              key={review.$id}
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="rounded-xl border border-green-300 bg-white p-5 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <h2 className="text-xl font-semibold text-green-800">{review.title}</h2>
              <p className="text-gray-700 mt-2">{review.message}</p>

              <div className="text-sm text-gray-500 mt-4">
                Rating: <span className="font-semibold">{review.rating} / 5</span>
              </div>
              <div className="text-sm text-gray-500">
                Date: {new Date(review.created_at).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">
                Category: {review.category || 'General'}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
