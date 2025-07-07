import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const DashPopularTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularTasks = async () => {
      try {
        const res = await axios.get(
          "https://freelancer-website-server.vercel.app/api/popular-tasks"
        );
        setTasks(res.data);
        setFilteredTasks(res.data);
      } catch (error) {
        console.error("Error fetching popular tasks:", error);
      }
    };
    fetchPopularTasks();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.category?.toLowerCase().includes(query)
    );
    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset page
  };

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-8 mt-10 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Tasks</h2>

      {/* Filter/Search */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Budget ($)</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Bids</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {task.title}
                </td>
                <td className="px-4 py-3">{task.category}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  {task.budget}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-blue-600 font-medium">
                  {task.bidCount || 0}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate(`/task-details/${task._id}`)}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {paginatedTasks.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashPopularTasks;
