// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"; // Need to add `.js` since using ES Modules
import messaegRoutes from "./routes/message.route.js"; // Need to add `.js` since using ES Modules

import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Define the port from environment variables
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Middleware to parse incoming JSON request bodies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //allow the cookies or auth headers to be sent with the request
  })
);
// Routes
app.use("/api/auth", authRoutes); // Mount authentication routes
app.use("/api/message", messaegRoutes);
// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB(); // Establish database connection
});

// 2*4^2
