import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

export default function Invoice() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token || !sessionId) return;

      try {
        const res = await axios.get(`https://multi-vendor-medicine-selling-e-com.vercel.app/api/order/${sessionId}`, {
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
    doc.setFontSize(18);
    doc.text("My Medicine Shop - Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${order.customer.name || order.userEmail}`, 20, 35);
    doc.text(`Email: ${order.customer.email}`, 20, 42);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 49);
    doc.line(20, 55, 190, 55);

    let y = 65;
    order.line_items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name}`, 20, y);
      doc.text(`Qty: ${item.quantity}`, 120, y);
      doc.text(`$${item.amount.toFixed(2)}`, 160, y);
      y += 8;
    });

    doc.setFontSize(14);
    doc.text(`Total: $${order.amount_total.toFixed(2)}`, 20, y + 10);
    doc.save("invoice.pdf");
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: 50, fontSize: 18 }}>Loading invoice...</div>
    );
  if (!order)
    return (
      <div style={{ textAlign: "center", padding: 50, fontSize: 18 }}>
        Order not found or you are not authorized.
      </div>
    );

  return (
    <div
      className="invoice-page"
      style={{
        maxWidth: 800,
        margin: "60px auto",
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 10,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <img src="https://devtechgroup.com/wp-content/uploads/2021/06/2021-Devtech-logo-m.png" alt="Logo" style={{ width: 50 }} />
        <h1 style={{ margin: 0, color: "#2c3e50" }}>Invoice</h1>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <div style={{ marginBottom: 20 }}>
        <p><strong>Name:</strong> {order.customer.name || order.userEmail}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 30,
          fontSize: 15,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={cellHeaderStyle}>Medicine</th>
            <th style={cellHeaderStyle}>Quantity</th>
            <th style={cellHeaderStyle}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.line_items.map((item, i) => (
            <tr key={i}>
              <td style={cellBodyStyle}>{item.name}</td>
              <td style={cellBodyStyle}>{item.quantity}</td>
              <td style={cellBodyStyle}>${item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ textAlign: "right", color: "#27ae60" }}>
        Total: ${order.amount_total.toFixed(2)}
      </h2>

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <button
          onClick={handlePrint}
          style={{
            backgroundColor: "#3498db",
            color: "#fff",
            padding: "12px 24px",
            fontSize: 15,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          📄 Print / Download PDF
        </button>
      </div>
    </div>
  );
}

const cellHeaderStyle = {
  padding: 12,
  border: "1px solid #ccc",
  fontWeight: "bold",
  textAlign: "left",
};

const cellBodyStyle = {
  padding: 12,
  border: "1px solid #eee",
};
