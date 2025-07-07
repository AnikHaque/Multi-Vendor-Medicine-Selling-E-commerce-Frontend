import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceCardDash = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://freelancer-website-server.vercel.app/api/featured")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <img
          src="https://cdn1.vectorstock.com/i/1000x1000/55/10/hand-fidget-spinner-logo-vector-15555510.jpg"
          className="animate-spin w-28 h-28 p-4 rounded-full"
          alt="Loading"
        />
      </div>
    );
  }

  return (
    <div className=" py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mt-10 mb-10 text-center">
          Featured Tasks Overview
        </h1>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {tasks.slice(0, 6).map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{task.title}</td>
                  <td className="px-6 py-4 max-w-md truncate">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/task-details/${task._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No featured tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardDash;
