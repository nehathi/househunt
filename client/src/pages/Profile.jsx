import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  if (!user) {
    return (
      <div className="container">
        <h2>Please Login</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h2>{user.name}</h2>

        <p><strong>Email:</strong> {user.email}</p>

        <p>
          <strong>Role:</strong>{" "}
          {user.role === "agent" ? "🧑‍💼 Agent / Broker" : "🙋 User"}
        </p>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}