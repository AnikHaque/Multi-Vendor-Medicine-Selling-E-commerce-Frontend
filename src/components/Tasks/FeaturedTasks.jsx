import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceCards = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    axios
      .get("https://freelancer-website-server.vercel.app/api/featured")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <img
          src="https://cdn1.vectorstock.com/i/1000x1000/55/10/hand-fidget-spinner-logo-vector-15555510.jpg"
          className="animate-spin w-28 h-28  p-4 rounded-full"
        ></img>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="md:text-5xl font-bold xl:w-3/4 mx-auto text-white mb-20">
          Take a brief look at our Featured Tasks
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.slice(0, 6).map((task) => (
            <div
              key={task.id}
              className="card bg-base-100 lg:max-w-lg shadow-sm p-3"
            >
              <figure>
                <img src={task.image} alt={task.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{task.title}</h2>
                <p>{task.description}</p>
                <button
                  onClick={() => navigate(`/task-details/${task._id}`)}
                  className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
