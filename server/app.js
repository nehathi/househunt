const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const chatRoutes = require("./routes/chatRoutes");
const offerRoutes = require("./routes/offerRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/property", propertyRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/offer", offerRoutes);

module.exports = app;