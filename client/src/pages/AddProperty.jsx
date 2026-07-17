import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const initialState = {
  title: "",
  description: "",
  location: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  image: "",
  virtualTour: "",
};

export default function AddProperty() {
  const navigate = useNavigate();

  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add a property.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !data.title ||
      !data.description ||
      !data.location ||
      !data.price ||
      !data.bedrooms ||
      !data.bathrooms
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: data.title,
        description: data.description,
        location: data.location,
        price: Number(data.price),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        virtualTour: data.virtualTour,
      };

      if (data.image.trim()) {
        payload.image = data.image.trim();
      }

      if (data.virtualTour.trim()) {
        payload.virtualTour = data.virtualTour.trim();
      }

      await api.post("/property", payload);

      alert("Property added successfully!");

      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to add property. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="form form-wide">
        <h2>Add Property</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title (e.g. 2 BHK Apartment)"
            value={data.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={data.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={data.location}
            onChange={handleChange}
          />

          <div className="form-row">
            <input
              type="number"
              name="price"
              placeholder="Price (₹ / month)"
              value={data.price}
              onChange={handleChange}
              min="0"
            />

            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={data.bedrooms}
              onChange={handleChange}
              min="0"
            />

            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={data.bathrooms}
              onChange={handleChange}
              min="0"
            />
          </div>

          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={data.image}
            onChange={handleChange}
          />

          <input
            type="text"
            name="virtualTour"
            placeholder="Virtual Tour URL (YouTube Link)"
            value={data.virtualTour}
            onChange={handleChange}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}