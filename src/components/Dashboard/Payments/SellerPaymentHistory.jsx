import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerPaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("You're not logged in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:8800/api/payment-history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.message) {
          setErrorMsg(res.data.message);
          setHistory([]);
        } else {
          setHistory(res.data);
        }
      })
      .catch(() => {
        setErrorMsg("Failed to load payment history.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold mb-6 text-center">💰 Seller Payment History</h2>

      {loading && <div className="text-center text-gray-600">Loading payment history...</div>}
      {errorMsg && <div className="text-center text-red-500">{errorMsg}</div>}

      {!loading && !errorMsg && history.length === 0 && (
        <div className="text-center text-gray-500">No payment records found.</div>
      )}

      {!loading && !errorMsg && history.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Buyer Email</th>
                <th className="px-6 py-3">Medicine Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Amount ($)</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Purchased On</th>
              </tr>
            </thead>
            <tbody>
              {history.map((order) =>
                order.line_items.map((item, idx) => (
                  <tr
                    key={`${order.orderId}-${idx}`}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{order.buyerEmail}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">${item.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SellerPaymentHistory;
