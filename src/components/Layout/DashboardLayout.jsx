import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Flame, CheckCircle } from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">🧭 Dashboard</h2>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard/overview"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </NavLink>

          <NavLink
            to="/dashboard/add-task"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Flame className="w-5 h-5" />
            Add a Task
          </NavLink>

          <NavLink
            to="/dashboard/all-tasks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Flame className="w-5 h-5" />
            All Tasks
          </NavLink>

          <NavLink
            to="/dashboard/featured-tasks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Flame className="w-5 h-5" />
            Featured Tasks
          </NavLink>

          <NavLink
            to="/dashboard/popular-tasks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Flame className="w-5 h-5" />
            Popular Tasks
          </NavLink>

          <NavLink
            to="/dashboard/my-tasks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <CheckCircle className="w-5 h-5" />
            My Tasks
          </NavLink>

          <NavLink
            to="/dashboard/add-blog"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Flame className="w-5 h-5" />
            Add a Blog
          </NavLink>
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
