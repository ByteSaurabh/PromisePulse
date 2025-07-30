import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { account } from '../appwrite/Appwrite';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    account.get()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
