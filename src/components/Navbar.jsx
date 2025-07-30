import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../appwrite/Appwrite";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    await account.deleteSession("current");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2 font-bold text-xl">
        <img
          src="/logo.png"
          alt="logo"
          className="h-8 w-8 rounded-full hidden sm:block"
          onError={(e) => (e.target.style.display = "none")}
        />
        <Link to="/" className="hover:text-green-400 transition">
          PromisePulse
        </Link>
      </div>

      {/* Right side buttons */}
      <div className="space-x-3 flex items-center">
        {isLoggedIn ? (
          <>
            <Link to="/home" className="hover:text-green-400 transition">Home</Link>
            <Link to="/promise-create" className="hover:text-green-400 transition">Create</Link>
            <Link to="/promise-list" className="hover:text-green-400 transition">List</Link>
            <Link to="/profile" className="hover:text-green-400 transition">Profile</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-400 transition">Login</Link>
            <Link to="/signup" className="hover:text-green-400 transition">Signup</Link>
          </>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-xl hover:text-yellow-300 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
