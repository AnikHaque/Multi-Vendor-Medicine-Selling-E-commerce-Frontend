import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  const fetchUsers = async (page = 1) => {
    try {
      const res = await axios.get(`https://multi-vendor-medicine-selling-e-com.vercel.app/api/users?page=${page}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  const updateRole = async (id, newRole) => {
    try {
      await axios.patch(
        `https://multi-vendor-medicine-selling-e-com.vercel.app/api/users/${id}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(currentPage); // Refresh current page
    } catch (err) {
      alert("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto mt-20">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Role</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">{user.role}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => updateRole(user._id, "admin")}
                      className="px-3 py-1 rounded-md bg-indigo-600 text-white text-xs hover:bg-indigo-700"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role !== "seller" && (
                    <button
                      onClick={() => updateRole(user._id, "seller")}
                      className="px-3 py-1 rounded-md bg-green-600 text-white text-xs hover:bg-green-700"
                    >
                      Make Seller
                    </button>
                  )}
                  {user.role !== "user" && (
                    <button
                      onClick={() => updateRole(user._id, "user")}
                      className="px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700"
                    >
                      Downgrade to User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center gap-3">
        <button
          onClick={() => fetchUsers(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => fetchUsers(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
