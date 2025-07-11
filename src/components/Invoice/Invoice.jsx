import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

export default function Invoice() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get session_id from query params
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token || !sessionId) return;

      try {
        const res = await axios.get(`http://localhost:8800/api/order/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (error) {
        console.error("Failed to fetch invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [token, sessionId]);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("My Medicine Shop", 20, 20);
    doc.setFontSize(16);
    doc.text(`Invoice for ${order.customer.name || order.userEmail}`, 20, 40);
    doc.text(`Email: ${order.customer.email}`, 20, 50);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 60);

    let y = 80;
    order.line_items.forEach((item, i) => {
      doc.text(
        `${i + 1}. ${item.name} - Qty: ${item.quantity} - $${item.amount.toFixed(2)}`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`Total: $${order.amount_total.toFixed(2)}`, 20, y + 10);
    doc.save("invoice.pdf");
  };

  if (loading) return <p>Loading invoice...</p>;
  if (!order) return <p>Order not found or you are not authorized.</p>;

  return (
    <div className="mt-40" style={{ padding: "20px" }}>
      <img src="/logo192.png" alt="Logo" style={{ maxWidth: 100, marginBottom: 20 }} />
      <h2>Invoice</h2>
      <p>
        <strong>Name:</strong> {order.customer.name || order.userEmail}
      </p>
      <p>
        <strong>Email:</strong> {order.customer.email}
      </p>
      <p>
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.line_items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ${order.amount_total.toFixed(2)}</h3>
      <button onClick={handlePrint} style={{ marginTop: "20px" }}>Print / Download PDF</button>
    </div>
  );
}
