import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, ID } from '../appwrite/Appwrite';
import { AuthContext } from '../context/AuthContext';

const PromiseCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!title || !description || !category) {
      setError('Please fill all the fields');
      setLoading(false);
      return;
    }

    try {
      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
          title,
          description,
          category,
          createdBy: user?.$id,
        }
      );
      navigate('/thank-you');
    } catch (err) {
      console.error('Error adding promise:', err);
      setError('Failed to create promise. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-100 dark:from-gray-900 dark:to-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl transition-all duration-300 hover:ring-4 hover:ring-green-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
          🌟 Create a New Promise
        </h2>

        {error && <p className="bg-red-100 text-red-600 p-3 mb-4 rounded">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Description</label>
          <textarea
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Category</label>
          <select
            className="w-full p-3 rounded border border-gray-300 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Environment">🌿 Environment</option>
            <option value="Education">📚 Education</option>
            <option value="Health">❤️ Health</option>
            <option value="Technology">💻 Technology</option>
            <option value="Infrastructure">🏗️ Infrastructure</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold transition duration-300 ${
            loading
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Creating...' : 'Create Promise'}
        </button>
      </form>
    </div>
  );
};

export default PromiseCreate;
