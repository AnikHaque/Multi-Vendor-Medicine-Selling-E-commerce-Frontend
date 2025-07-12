import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerPaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Not logged in");
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
        setErrorMsg("Failed to load payment history");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading payment history...</div>;
  if (errorMsg) return <div>{errorMsg}</div>;

  return (
    <div>
      <h2>Seller Payment History</h2>
      <table>
        <thead>
          <tr>
            <th>Buyer Email</th>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Amount ($)</th>
            <th>Status</th>
            <th>Purchased On</th>
          </tr>
        </thead>
        <tbody>
          {history.map((order) =>
            order.line_items.map((item, idx) => (
              <tr key={`${order.orderId}-${idx}`}>
                <td>{order.buyerEmail}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.amount.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPaymentHistory;
