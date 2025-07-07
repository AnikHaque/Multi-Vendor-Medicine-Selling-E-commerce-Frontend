import React, { useEffect, useState } from "react";
import { Users, ClipboardList, Star, Flame } from "lucide-react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Overview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    featuredTasks: 0,
    popularTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, tasksRes, featuredRes, popularRes] = await Promise.all(
          [
            axios.get("https://freelancer-website-server.vercel.app/api/users"),
            axios.get("https://freelancer-website-server.vercel.app/api/tasks"),
            axios.get(
              "https://freelancer-website-server.vercel.app/api/featured"
            ),
            axios.get(
              "https://freelancer-website-server.vercel.app/api/popular-tasks"
            ),
          ]
        );

        setStats({
          totalUsers: usersRes.data.length,
          totalTasks: tasksRes.data.length,
          featuredTasks: featuredRes.data.length,
          popularTasks: popularRes.data.length,
        });
      } catch (error) {
        console.error("Error loading overview stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cardStyle =
    "flex items-center justify-between p-6 bg-white shadow rounded-2xl border border-gray-200";

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Tasks", value: stats.totalTasks },
    { name: "Featured", value: stats.featuredTasks },
    { name: "Popular", value: stats.popularTasks },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className={cardStyle}>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Total Users</h2>
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalUsers}
            </p>
          </div>
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <div className={cardStyle}>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Total Tasks</h2>
            <p className="text-2xl font-bold text-green-600">
              {stats.totalTasks}
            </p>
          </div>
          <ClipboardList className="w-8 h-8 text-green-600" />
        </div>
        <div className={cardStyle}>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">
              Featured Tasks
            </h2>
            <p className="text-2xl font-bold text-yellow-500">
              {stats.featuredTasks}
            </p>
          </div>
          <Star className="w-8 h-8 text-yellow-500" />
        </div>
        <div className={cardStyle}>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Popular Tasks</h2>
            <p className="text-2xl font-bold text-red-500">
              {stats.popularTasks}
            </p>
          </div>
          <Flame className="w-8 h-8 text-red-500" />
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white shadow rounded-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          📈 Stats Overview (Chart)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
