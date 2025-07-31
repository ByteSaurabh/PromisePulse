import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Account from './pages/Account';
import PromiseCreate from './pages/PromiseCreate';
import PromiseList from './pages/PromiseList';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import PromiseThankYou from './pages/PromiseThankYou';
import AdminDashboard from './pages/AdminDashboard';
import AllUsers from './pages/AllUsers';
import AdminAllPromises from './pages/AdminAllPromises';
import AdminUsers from './pages/AdminUsers';
import Profile from './pages/Profile';
import UserDashboard from './pages/UserDashboard';
import Results from './pages/Results';
import MyAchievements from './pages/MyAchievements';
import Reviews from './pages/Reviews';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promise-create"
          element={
            <ProtectedRoute>
              <PromiseCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promise-list"
          element={
            <ProtectedRoute>
              <PromiseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/thank-you"
          element={
            <ProtectedRoute>
              <PromiseThankYou />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute>
            <AllUsers />
          </ProtectedRoute>
        }
      />
<Route path="/admin/promises" element={
  <ProtectedRoute>
    <AdminAllPromises />
  </ProtectedRoute>
} />

<Route path="/admin/users-list" element={
  <ProtectedRoute>
    <AdminUsers />
  </ProtectedRoute>
} />

<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />

<Route path="/user-dashboard" element={<UserDashboard />} />

<Route path="/results" element={
  <ProtectedRoute>
    <Results />
  </ProtectedRoute>
} />

<Route path="/badges" element={
  <ProtectedRoute>
    <MyAchievements />
  </ProtectedRoute>
} />

<Route path="/reviews" element={
  <ProtectedRoute>
    <Reviews />
  </ProtectedRoute>
} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;
