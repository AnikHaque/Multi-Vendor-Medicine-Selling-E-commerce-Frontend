import axios from "axios";

export default function Checkout() {
  const token = localStorage.getItem("token");

  const handleCheckout = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8800/api/create-checkout-session",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout");
    }
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#f4f6f8",
        padding: "60px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: 500,
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: 20,
            color: "#2c3e50",
            borderBottom: "2px solid #3498db",
            paddingBottom: 10,
          }}
        >
          Checkout
        </h1>
        <p style={{ fontSize: 16, color: "#7f8c8d", marginBottom: 30 }}>
          Click below to proceed to secure payment.
        </p>
        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: "#27ae60",
            color: "#fff",
            padding: "14px 28px",
            fontSize: 16,
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Pay with Card 💳
        </button>
      </div>
    </div>
  );
}
