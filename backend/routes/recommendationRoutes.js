import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getSimilarMovies,
  getPersonalizedRecommendations,
} from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/similar/:movieId", getSimilarMovies);

router.get("/personalized", protect, getPersonalizedRecommendations);

export default router;