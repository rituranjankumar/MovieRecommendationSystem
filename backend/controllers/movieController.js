import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  searchMovies,
  getMovieDetails,
} from "../services/tmdbService.js";

// Trending Movies
export const getTrending = async (req, res, next) => {
  try {
    const movies = await getTrendingMovies();

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Popular Movies
export const getPopular = async (req, res, next) => {
  try {
    const movies = await getPopularMovies();

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Top Rated Movies
export const getTopRated = async (req, res, next) => {
  try {
    const movies = await getTopRatedMovies();

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Now Playing
export const getNowPlaying = async (req, res, next) => {
  try {
    const movies = await getNowPlayingMovies();

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Search Movies
export const search = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const movies = await searchMovies(query);

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Movie Details
export const details = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await getMovieDetails(id);

    res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    next(error);
  }
};