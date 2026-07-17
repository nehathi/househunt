import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🏠 House Rent</h2>

      <div>
        <Link to="/">Home</Link>

        {token && <Link to="/dashboard">Dashboard</Link>}

        {token && <Link to="/offers">Offers</Link>}

        {token && <Link to="/add">Add Property</Link>}

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              style={{
                color: "white",
                marginLeft: "20px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              👤 {user?.name}
            </Link>

            <Link
              to="/profile"
              style={{
                color: "#FFD54F",
                marginLeft: "15px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {user?.role === "agent"
                ? "🧑‍💼 Agent"
                : "🙋 User"}
            </Link>

            <button
              onClick={logout}
              style={{
                marginLeft: "20px",
                padding: "8px 15px",
                background: "#e53935",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}