import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  const formattedPrice = Number(property.price).toLocaleString("en-IN");

  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={property.image} alt={property.title} />
        <span className="badge-type">For Rent</span>
      </div>

      <h3>{property.title}</h3>
      <p className="location">📍 {property.location}</p>

      <div className="specs">
        <span>🛏 {property.bedrooms} Bed</span>
        <span>🛁 {property.bathrooms} Bath</span>
      </div>

      <h4>₹ {formattedPrice} / month</h4>

      <Link to={`/property/${property._id}`}>View Details</Link>
    </div>
  );
}
