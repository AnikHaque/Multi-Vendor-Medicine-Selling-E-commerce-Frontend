import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerPaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8800/api/payment-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.message === "No purchase history found.") {
          setHistory([]);
        } else {
          setHistory(res.data);
        }
      } catch (err) {
        setError("Failed to fetch payment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading payment history...</p>;
  if (error) return <p>{error}</p>;
  if (history.length === 0) return <p>No purchase history found.</p>;

  return (
    <div className="p-4 mt-72">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Buyer Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Payment Status</th>
            <th className="border px-4 py-2">Total Amount</th>
            <th className="border px-4 py-2">Items</th>
            <th className="border px-4 py-2">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((order) => (
            <tr key={order.orderId}>
              <td className="border px-4 py-2">{order.orderId}</td>
              <td className="border px-4 py-2">{order.buyerEmail}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">{order.payment_status}</td>
              <td className="border px-4 py-2">${order.amount_total.toFixed(2)}</td>
              <td className="border px-4 py-2">
                <ul>
                  {order.line_items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity} (${item.amount.toFixed(2)})
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPaymentHistory;
