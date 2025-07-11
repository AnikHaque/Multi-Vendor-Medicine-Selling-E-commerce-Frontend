import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [language, setLanguage] = useState("EN");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    const userStr = localStorage.getItem("user");
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    let parsedUser = null;
    if (userStr && userStr !== "undefined") {
      try {
        parsedUser = JSON.parse(userStr);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }

    if (token && parsedUser) {
      setUser(parsedUser);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  const role = user?.role ?? "No role found";
  console.log("User role from localStorage:", role);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="bg-black text-white px-4 py-6 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img
            src="https://devtechgroup.com/wp-content/uploads/2021/06/2021-Devtech-logo-m.png"
            alt="Logo"
            className="w-10"
          />
          <span>FreelancerHub</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none text-2xl"
        >
          ☰
        </button>

        <div
          className={`w-full md:w-auto mt-4 md:mt-0 ${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/" className="block py-1">
              Home
            </Link>
            <Link to="/products" className="block py-1">
              Shop
            </Link>
            <Link to="/cart" className="flex items-center gap-1 py-1">
              <FaShoppingCart className="text-lg" /> Cart
            </Link>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-black text-white border px-2 py-1 rounded"
            >
              <option value="EN">EN</option>
              <option value="BN">BN</option>
            </select>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <button
              onClick={() => {
                const newTheme = theme === "light" ? "dark" : "light";
                setTheme(newTheme);
                localStorage.setItem("theme", newTheme);
                document.documentElement.setAttribute("data-theme", newTheme);
              }}
              className="border border-white px-3 py-1 rounded text-sm"
              title="Toggle Theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {isLoggedIn ? (
              <div className="relative" id="user-dropdown">
                <div
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => setShowUserDropdown((prev) => !prev)}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-black">
                      ?
                    </div>
                  )}
                </div>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 bg-black text-white rounded shadow-lg p-3 text-sm z-20 w-48">
                    <Link to="/profile" className="block mb-2 hover:underline">
                      Update Profile
                    </Link>
                    <Link to="/dashboard" className="block mb-2 hover:underline">
                      {role}
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/register"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
