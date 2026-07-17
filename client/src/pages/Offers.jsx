import { useEffect, useState } from "react";
import api from "../services/api";

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const res = await api.get("/offer");
      setOffers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/offer/${id}`, { status });

      alert(`Offer ${status}`);

      loadOffers();
    } catch (err) {
      alert("Failed");
    }
  };

  return (
    <div className="container">
      <h2>Offers Received</h2>

      {offers.length === 0 && (
        <p>No offers received.</p>
      )}

      {offers.map((offer) => (
        <div
          key={offer._id}
          className="manage-row"
        >
          <div className="manage-info">
            <h3>{offer.property?.title}</h3>

            <p>
              Buyer :
              {" "}
              {offer.buyer?.name}
            </p>

            <p>
              Email :
              {" "}
              {offer.buyer?.email}
            </p>

            <h3>
              ₹ {offer.amount.toLocaleString("en-IN")}
            </h3>

            <p>Status : {offer.status}</p>
          </div>

          {offer.status === "Pending" && (
            <div className="manage-actions">
              <button
                className="edit-btn"
                onClick={() =>
                  updateStatus(
                    offer._id,
                    "Accepted"
                  )
                }
              >
                Accept
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  updateStatus(
                    offer._id,
                    "Rejected"
                  )
                }
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}