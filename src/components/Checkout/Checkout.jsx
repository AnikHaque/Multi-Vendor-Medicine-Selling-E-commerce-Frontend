
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
        window.location.href = res.data.url; // Redirect to Stripe checkout
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout");
    }
  };

  return (
    <div style={{ padding: 20 }} className="mt-40">
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Pay with Card</button>
    </div>
  );
}
