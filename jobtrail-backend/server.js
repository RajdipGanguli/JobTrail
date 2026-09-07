import dotenv from "dotenv";
dotenv.config(); // Must be called before reading process.env!

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import applicationRoutes from "./routes/applications.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("JobTrail API is running...");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("Attempting to connect with URI:", MONGO_URI ? MONGO_URI.replace(/:([^:@]+)@/, ":****@") : "UNDEFINED");

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log(">>> MongoDB Connected Successfully! <<<");
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(">>> FATAL DB ERROR <<<:", err.message);
    process.exit(1);
  });