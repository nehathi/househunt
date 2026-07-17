import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import OfferModal from "../components/OfferModal";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/property/${id}`);
      setProperty(res.data);
    } catch (err) {
      setError("Property not found.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please login to delete this property.");
      navigate("/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      await api.delete(`/property/${id}`);
      alert("Property deleted.");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to delete property.");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p className="loading-text">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container">
        <p className="error-text">{error || "Property not found."}</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const formattedPrice = Number(property.price).toLocaleString("en-IN");

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Back to listings
      </Link>

      <div className="details-card">
        <img
          src={property.image}
          alt={property.title}
          className="details-img"
        />

        <div className="details-body">
          <h1>{property.title}</h1>

          <p className="location">📍 {property.location}</p>

          <div className="details-specs">
            <span>🛏 {property.bedrooms} Bedrooms</span>
            <span>🛁 {property.bathrooms} Bathrooms</span>
          </div>

          <h2 className="details-price">
            ₹ {formattedPrice} / month
          </h2>

          <p className="details-description">
            {property.description}
          </p>

          {property.virtualTour && (
            <div style={{ marginBottom: "20px" }}>
              <a
                href={property.virtualTour}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn"
              >
                🎥 Virtual Tour
              </a>
            </div>
          )}

          {property.owner?.name && (
            <p className="details-owner">
              Listed by: {property.owner.name}
              {property.owner.email
                ? ` (${property.owner.email})`
                : ""}
            </p>
          )}

          <div className="details-actions">
            <Link
              to={`/chat/${property._id}`}
              className="contact-btn"
            >
              Contact Owner
            </Link>

            <button
              className="view-btn"
              onClick={() => setShowOffer(true)}
            >
              💰 Make Offer
            </button>

            <Link
              to={`/edit/${property._id}`}
              className="edit-btn"
            >
              Edit
            </Link>

            <button
              className="delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <OfferModal
        propertyId={property._id}
        show={showOffer}
        onClose={() => setShowOffer(false)}
      />
    </div>
  );
}