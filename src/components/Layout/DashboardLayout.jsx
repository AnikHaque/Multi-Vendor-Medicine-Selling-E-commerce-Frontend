import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Flame,
  CheckCircle,
} from "lucide-react";

const DashboardLayout = () => {
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

  const navItem = (to, icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">🧭 Dashboard</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItem("/dashboard/overview", <LayoutDashboard className="w-5 h-5" />, "Overview")}

          {/* ✅ ADMIN ONLY */}
          {role === "admin" && (
            <>
              {navItem("/dashboard/manage-users", <Flame className="w-5 h-5" />, "Manage Users")}
              {navItem("/dashboard/manage-category", <Flame className="w-5 h-5" />, "Manage Category")}
              {navItem("/dashboard/add-category", <Flame className="w-5 h-5" />, "Add a Category")}
              {navItem("/dashboard/add-medicine", <Flame className="w-5 h-5" />, "Add a Medicine")}
              {navItem("/dashboard/featured-tasks", <Flame className="w-5 h-5" />, "Featured Tasks")}
              {navItem("/dashboard/popular-tasks", <Flame className="w-5 h-5" />, "Popular Tasks")}
            </>
          )}

          {/* ✅ SELLER ONLY */}
          {role === "seller" && (
            <>
              {navItem("/dashboard/add-blog", <Flame className="w-5 h-5" />, "Add a Blog")}
              {navItem("/dashboard/my-tasks", <CheckCircle className="w-5 h-5" />, "My Tasks")}
            </>
          )}

          {/* ✅ USER ONLY */}
          {role === "user" && (
            <>
              {navItem("/dashboard/all-tasks", <Flame className="w-5 h-5" />, "All Tasks")}
            </>
          )}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
