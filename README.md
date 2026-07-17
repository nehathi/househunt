House Rent

A full-stack property rental and listing platform built on the MERN stack (MongoDB, Express, React, Node.js). Users can browse and search rental properties, register as a standard user or agent, list and manage their own properties, negotiate through an in-app offer system, and chat directly with property owners.

Features


Authentication — JWT-based login/register with bcrypt password hashing and role support (user, agent, admin)
Property Listings — Create, edit, and delete listings with title, description, location, price, bedrooms, bathrooms, image, and an optional virtual tour link
Search & Filter — Search by title/area/city, filter by city, price range, and bedroom count, with sorting and "load more" pagination
Offers — Buyers submit offers on a property; owners accept or reject them (Pending / Accepted / Rejected)
Chat — Per-property messaging between a sender and receiver
Dashboard & Profile — Manage your own listings and view account details


Tech Stack

Frontend: React 19, Vite, React Router v7, Axios
Backend: Node.js, Express 4
Database: MongoDB (via Mongoose 8)
Auth: JSON Web Tokens (JWT) + bcryptjs

Project Structure

House-Rent/
├── server/
│   ├── controllers/    # auth, property, offer, chat logic
│   ├── models/         # User, Property, Offer, Chat schemas
│   ├── routes/         # API routes
│   ├── middleware/      # JWT auth middleware
│   └── server.js
└── client/
    └── src/
        ├── pages/       # Home, Login, Register, Dashboard, AddProperty,
        │                # EditProperty, PropertyDetails, Offers, Profile, Chat
        └── components/  # Navbar, Footer, PropertyCard, OfferModal

API Overview

RouteMethod(s)Auth Required/api/auth/register, /api/auth/loginPOSTNo/api/propertyGET, POSTPOST only/api/property/:idGET, PUT, DELETEPUT/DELETE only/api/offerGET, POSTYes/api/offer/:idPUTYes/api/chatPOSTNo*/api/chat/:propertyIdGETNo*

* Chat routes currently bypass the auth middleware — see Known Issues below.

Getting Started

Prerequisites


Node.js 18+
A MongoDB connection string (local or Atlas)


Server

bashcd server
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

bashnpm run dev

Client

bashcd client
npm install
npm run dev

Seed sample data (optional)

bashnpm run seed

Known Issues / Before You Deploy


.env must never be committed. Add it to .gitignore immediately, and rotate any credentials that were ever pushed to a public repo.
Chat routes (/api/chat/*) are not currently protected by the JWT auth middleware — anyone can post or read messages if they know a property ID. Apply the same auth middleware used on the property/offer routes.
No rate limiting on /api/auth/login or /register yet.
No password-reset flow yet.


Roadmap


 Secure chat routes with auth middleware
 Server-side search/filtering with indexes (currently client-side)
 Image uploads via Cloudinary/S3 instead of external URLs
 Real-time chat via WebSockets
 Email verification & password reset
 Optional payment/booking deposit flow
