// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { account } from '../appwrite/Appwrite'; // ✅ Make sure Appwrite.js exports `account`

export const AuthContext = createContext();

const ADMIN_EMAIL = 'saurabhaasharma@gmail.com';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    account.get()
      .then(user => {
        setIsLoggedIn(true);
        setIsAdmin(user.email === ADMIN_EMAIL);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // ✅ This is important to fix the `export 'default'` error
