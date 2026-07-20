import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";



connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // Local React
  "movie-recommendation-system-lu34a8987.vercel.app",  // Production React (Vercel)
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Movie Discovery API is running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/recommendations", recommendationRoutes);
// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});