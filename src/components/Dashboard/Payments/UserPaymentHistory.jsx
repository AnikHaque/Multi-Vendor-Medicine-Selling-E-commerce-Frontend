import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserPaymentHistory() {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:8800/api/orders/user-history", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setHistory(res.data))
    .catch((err) => console.error("Payment history error:", err));
  }, []);

  if (!history.length) {
    return <p className="text-center text-gray-600">No payment history found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Payment History</h2>
      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Total Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Purchased Items</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((order, idx) => (
            <tr key={order._id} className="border-t">
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{order.sessionId}</td>
              <td className="p-2 border">${order.amount_total.toFixed(2)}</td>
              <td className="p-2 border capitalize">{order.payment_status}</td>
              <td className="p-2 border">
                <ul className="list-disc list-inside">
                  {order.line_items.map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-2 border">
                {new Date(order.createdAt).toLocaleDateString()} <br />
                {new Date(order.createdAt).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
