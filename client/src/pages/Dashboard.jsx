import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view the dashboard.");
      navigate("/login");
      return;
    }
    loadProperties();
  }, [navigate]);

  const loadProperties = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/property");
      setProperties(res.data);
    } catch (err) {
      setError("Failed to load properties.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalProperties = properties.length;

  const averageRent =
    totalProperties > 0
      ? Math.round(
          properties.reduce((sum, p) => sum + Number(p.price), 0) /
            totalProperties
        )
      : 0;

  const highestRent =
    totalProperties > 0
      ? Math.max(...properties.map((p) => Number(p.price)))
      : 0;

  const totalLocations = new Set(
    properties.map((p) => p.location)
  ).size;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }
    try {
      await api.delete(`/property/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete property.");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to House Rent Dashboard</p>
        </div>

        <Link to="/add" className="add-btn">
          + Add Property
        </Link>
      </div>

      <div className="analytics-grid">
      <div className="analytics-card">
        <h3>🏠 Total Properties</h3>
        <h2>{totalProperties}</h2>
      </div>

      <div className="analytics-card">
        <h3>💰 Average Rent</h3>
        <h2>₹ {averageRent.toLocaleString("en-IN")}</h2>
      </div>

      <div className="analytics-card">
        <h3>🏡 Highest Rent</h3>
        <h2>₹ {highestRent.toLocaleString("en-IN")}</h2>
      </div>

      <div className="analytics-card">
        <h3>📍 Total Locations</h3>
        <h2>{totalLocations}</h2>
      </div>
    </div>

      <div className="results-info">
        {properties.length} propert{properties.length === 1 ? "y" : "ies"} listed
      </div>

      {loading && <p className="loading-text">Loading properties...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && properties.length === 0 && (
        <p className="loading-text">
          No properties yet. Click "Add Property" to create one.
        </p>
      )}

      <div className="manage-list">
        {properties.map((property) => (
          <div className="manage-row" key={property._id}>
            <img
              src={property.image}
              alt={property.title}
              className="manage-thumb"
            />

            <div className="manage-info">
              <h3>{property.title}</h3>
              <p className="location">📍 {property.location}</p>
              <p className="manage-specs">
                🛏 {property.bedrooms} Bed &nbsp; 🛁 {property.bathrooms} Bath
                &nbsp; ₹ {Number(property.price).toLocaleString("en-IN")}/month
              </p>
            </div>

            <div className="manage-actions">
              <Link to={`/property/${property._id}`} className="view-btn">
                View
              </Link>
              <Link to={`/edit/${property._id}`} className="edit-btn">
                Edit
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(property._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}