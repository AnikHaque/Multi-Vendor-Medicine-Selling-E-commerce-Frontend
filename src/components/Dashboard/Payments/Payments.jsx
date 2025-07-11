import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8800/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error("Failed to fetch payments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8800/api/payments/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Payment approved!");
      fetchPayments(); // refresh list
    } catch (err) {
      console.error("Failed to approve payment", err);
      alert("Failed to approve payment");
    }
  };

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Payment Management</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Customer Email</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">No payments found.</td>
            </tr>
          )}
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="border border-gray-300 p-2">{payment.customer.email}</td>
              <td className="border border-gray-300 p-2">${payment.amount_total.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 capitalize">{payment.status}</td>
              <td className="border border-gray-300 p-2">
                {payment.status === "pending" ? (
                  <button
                    onClick={() => handleApprove(payment._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Approve
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold"></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
