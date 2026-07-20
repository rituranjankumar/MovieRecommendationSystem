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
  "http://localhost:5173",
  "https://movie-recommendation-system-lu34a8987.vercel.app",
  "https://movie-recommendation-system-nine-murex.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);
      console.log("Allowed Origins:", allowedOrigins);

      if (!origin) {
        console.log("No Origin header");
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        console.log("Origin Allowed");
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);
      callback(new Error("Not allowed by CORS"));
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