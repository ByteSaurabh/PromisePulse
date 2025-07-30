// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { account } from '../appwrite/Appwrite';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    account.get()
      .then((res) => {
        setUser(res);
        setName(res.name || '');
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  const updateName = async () => {
    try {
      await account.updateName(name);
      setSuccessMsg('✅ Name updated successfully');
    } catch {
      setErrorMsg('❌ Failed to update name');
    }
  };

  const updatePassword = async () => {
    try {
      await account.updatePassword(password);
      setSuccessMsg('✅ Password updated');
      setPassword('');
    } catch {
      setErrorMsg('❌ Failed to update password');
    }
  };

  const deleteAccount = async () => {
    try {
      await account.deleteSession('current');
      setIsLoggedIn(false);
      navigate('/');
    } catch {
      setErrorMsg('❌ Failed to delete session');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6">👤 Profile Settings</h2>

        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

        {user && (
          <div className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" value={user.email} readOnly className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={name}
                className="w-full p-2 border rounded"
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={updateName}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update Name
              </button>
            </div>

            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                value={password}
                className="w-full p-2 border rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={updatePassword}
                className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
              >
                Update Password
              </button>
            </div>

            <div className="pt-4 border-t mt-6">
              <button
                onClick={deleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Logout / Delete Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
