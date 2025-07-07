import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserPaymentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/orders/user-history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHistory(res.data))
      .catch((err) => console.error("Payment history error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading your payment history...</p>;
  }

  if (!history.length) {
    return <p className="text-center mt-20 text-gray-600">No payment history found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🧾 Your Payment History</h2>
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full table-auto text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Transaction ID</th>
              <th className="p-3 border">Total ($)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Purchased Items</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((order, idx) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 text-blue-600">{order.sessionId}</td>
                <td className="p-3 font-semibold">${order.amount_total}</td>
                <td className="p-3 capitalize">{order.payment_status}</td>
                <td className="p-3">
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {order.line_items.map((item, i) => (
                      <li key={i}>
                        {item.name} <span className="text-sm text-gray-500">× {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()} <br />
                  <span className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
