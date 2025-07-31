import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, account } from '../appwrite/Appwrite'; // Ensure account is imported
import { ID } from 'appwrite';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../assets/hero-promise.json';

const DATABASE_ID = '687f1cc40016fbef2543';
const COLLECTION_ID = '687f1d2d000fe5d153f8';

const PromiseCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(''); // previously category
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!title || !description || !options || !state || !district || !pincode) {
      setError('Please fill all the fields');
      setLoading(false);
      return;
    }

    try {
      const sessionUser = await account.get(); // get latest logged in user

      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
       ID.unique(),
        {
          title,
          description,
          options: JSON.stringify(options),
          state,
          district,
          pincode: parseInt(pincode),
          created_at: new Date().toISOString(),
          created_by: sessionUser?.$id || "anonymous",
        }
      );

      navigate('/thank-you');
    } catch (err) {
      console.error('Error adding promise:', err.message);
      setError('Failed to create promise. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-900 dark:to-black flex flex-col items-center justify-center px-4 py-8">
      {/* Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-64 sm:w-80 md:w-96 mb-6"
      >
        <Lottie animationData={animationData} loop={true} />
      </motion.div>

      {/* Motion Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-2xl rounded-xl p-8 w-full max-w-2xl border border-white/20 dark:border-gray-700"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center text-green-800 dark:text-green-400 drop-shadow-sm">
          🌟 Create a New Promise
        </h2>

        {error && <p className="bg-red-100 text-red-600 p-3 mb-4 rounded">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Category</label>
          <select
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Category</option>
            <option value="Environment">🌿 Environment</option>
            <option value="Education">📚 Education</option>
            <option value="Health">❤️ Health</option>
            <option value="Technology">💻 Technology</option>
            <option value="Infrastructure">🏗️ Infrastructure</option>
          </select>
        </div>

        {/* State, District, Pincode */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Pincode</label>
            <input
              type="number"
              pattern="[0-9]{6}"
              title="Enter a valid 6-digit pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold tracking-wide transition-all duration-300 transform ${
            loading
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 hover:scale-105'
          }`}
        >
          {loading ? 'Creating...' : 'Create Promise'}
        </button>
      </motion.form>
    </div>
  );
};

export default PromiseCreate;
