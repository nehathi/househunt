import { useState } from "react";
import api from "../services/api";

export default function OfferModal({
  propertyId,
  show,
  onClose,
}) {
  const [amount, setAmount] = useState("");

  const sendOffer = async () => {
    if (!amount) {
      alert("Enter Offer Amount");
      return;
    }

    try {
      await api.post("/offer", {
        propertyId,
        amount,
      });

      alert("Offer Sent Successfully");

      setAmount("");

      onClose();
    } catch (err) {
        console.log(err);

        console.log("Backend Error:", err.response?.data);

        alert(
            err.response?.data?.message || "Failed to send offer"
        );
    }
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <h2>Make an Offer</h2>

        <input
          type="number"
          placeholder="Offer Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button onClick={sendOffer}>
            Send Offer
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}