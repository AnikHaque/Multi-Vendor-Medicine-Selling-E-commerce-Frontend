import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [titleFilter, setTitleFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://freelancer-website-server.vercel.app/api/tasks")
      .then((res) => {
        setTasks(res.data);
        setFilteredTasks(res.data);
      })
      .catch((err) => console.error("Failed to fetch tasks", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...tasks];

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((task) => task.category === categoryFilter);
    }

    // Title filter
    if (titleFilter.trim() !== "") {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    // Sorting by budget
    filtered.sort((a, b) => {
      const budgetA = parseFloat(a.budget);
      const budgetB = parseFloat(b.budget);
      return sortOrder === "asc" ? budgetA - budgetB : budgetB - budgetA;
    });

    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset page on filter change
  }, [tasks, categoryFilter, sortOrder, titleFilter]);

  const categories = [
    "All",
    "Web Development",
    "Design",
    "Writing",
    "Marketing",
  ];

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <img
          src="https://cdn1.vectorstock.com/i/1000x1000/55/10/hand-fidget-spinner-logo-vector-15555510.jpg"
          className="animate-spin w-20 h-20 p-4 rounded-full"
          alt="Loading"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Browse Tasks
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <select
            className="px-4 py-2 border rounded shadow-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded shadow-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Budget: Low to High</option>
            <option value="desc">Budget: High to Low</option>
          </select>

          <input
            type="text"
            placeholder="Search by title..."
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm w-64"
          />
        </div>

        {/* Tasks */}
        {currentTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    <strong>Category:</strong> {task.category}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    <strong>Budget:</strong> ${task.budget}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>Deadline:</strong>{" "}
                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => navigate(`/task-details/${task._id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-4 py-2 border rounded-full ${
                  currentPage === num
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTasks;
