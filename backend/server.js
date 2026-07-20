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
const allowedOriginRegex =
  /^https:\/\/movie-recommendation-system-.*\.vercel\.app$/;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (
        origin === "http://localhost:5173" ||
        allowedOriginRegex.test(origin)
      ) {
        return callback(null, true);
      }

      console.log("incoming origin is -> ",origin)
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