import axios from "axios";
import Favorite from "../models/favoriteModel.js";
import { getMovieDetails } from "../services/tmdbService.js";

// ======================================================
// GET /api/recommendations/similar/:movieId
// Accessible to guests and logged-in users
// ======================================================

export const getSimilarMovies = async (req, res, next) => {
    try {

        const { movieId } = req.params;

        // Call FastAPI
        const response = await axios.get(
            `${process.env.ML_SERVICE_URL}/recommend/similar/${movieId}`
        );

        // FastAPI returns:
        // [
        //   { tmdbId, title, score }
        // ]

        const recommendedIds = response.data.map(
            movie => movie.tmdbId
        );

        // Fetch complete movie details from TMDB
        const movies = await Promise.all(
            recommendedIds.map(id => getMovieDetails(id))
        );

        res.status(200).json({
            success: true,
            movies
        });

    } catch (error) {
          // Movie not present in ML dataset
        if (error.response?.status === 404) {
            return res.status(200).json({
                success: true,
                movies: [],
            });
        }
        next(error);
    }
};

// ======================================================
// GET /api/recommendations/personalized
// Logged-in users only
// ======================================================

export const getPersonalizedRecommendations = async (
    req,
    res,
    next
) => {
    try {

        // User's favourite movies
        const favorites = await Favorite.find({
            userId: req.user._id
        });

        if (favorites.length === 0) {
            return res.status(200).json({
                success: true,
                personalized: false,
                movies: []
            });
        }

        // Extract TMDB IDs
        const movieIds = favorites.map(movie => movie.tmdbId);

        // Call FastAPI
        const response = await axios.post(
            `${process.env.ML_SERVICE_URL}/recommend/personalized`,
            {
                movie_ids: movieIds
            }
        );

        // FastAPI returns:
        // [
        //   { tmdbId, title, score }
        // ]

        const recommendedIds = response.data.map(
            movie => movie.tmdbId
        );

        // Fetch complete movie information
        const movies = await Promise.all(
            recommendedIds.map(id => getMovieDetails(id))
        );

        res.status(200).json({
            success: true,
            personalized: true,
            movies
        });

    } catch (error) {
        next(error);
    }
};