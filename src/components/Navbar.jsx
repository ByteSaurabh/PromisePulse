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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="bg-gray-900 text-white dark:bg-gray-800 shadow-md p-4">
      <div className="flex justify-between items-center">
        {/* Logo and Title */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-3 items-center">
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

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="text-xl hover:text-yellow-300 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-2">
          {isLoggedIn ? (
            <>
              <Link to="/home" className="hover:text-green-400 transition">Home</Link>
              <Link to="/promise-create" className="hover:text-green-400 transition">Create</Link>
              <Link to="/promise-list" className="hover:text-green-400 transition">List</Link>
              <Link to="/profile" className="hover:text-green-400 transition">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition w-fit"
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
