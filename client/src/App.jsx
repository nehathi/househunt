import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import PropertyDetails from "./pages/PropertyDetails";
import Chat from "./pages/Chat"; // NEW

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/offers" element={<Offers />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add" element={<AddProperty />} />

        <Route path="/edit/:id" element={<EditProperty />} />

        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Chat Page */}
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;