import api from "./api";

import {
  movieStart,
  homeMoviesSuccess,
  searchMoviesSuccess,
  movieDetailsSuccess,
  movieFailure,
} from "../features/movies/movieSlice";

// Home Movies
export const fetchHomeMovies = async (dispatch) => {
  dispatch(movieStart());

  try {
    const [trending, popular, topRated, nowPlaying] = await Promise.all([
      api.get("/movies/trending"),
      api.get("/movies/popular"),
      api.get("/movies/top-rated"),
      api.get("/movies/now-playing"),
    ]);

    dispatch(
      homeMoviesSuccess({
        trending: trending.data.movies,
        popular: popular.data.movies,
        topRated: topRated.data.movies,
        nowPlaying: nowPlaying.data.movies,
      })
    );
  } catch (error) {
    dispatch(
      movieFailure(
        error.response?.data?.message || "Failed to load movies"
      )
    );

    throw error;
  }
};

// Search Movies
export const searchMovies = async (query, dispatch) => {
  dispatch(movieStart());

  try {
    const response = await api.get("/movies/search", {
      params: { query },
    });

    dispatch(searchMoviesSuccess(response.data.movies));
  } catch (error) {
    dispatch(
      movieFailure(
        error.response?.data?.message || "Search failed"
      )
    );

    throw error;
  }
};

// Movie Details
export const fetchMovieDetails = async (id, dispatch) => {
  dispatch(movieStart());

  try {
    const response = await api.get(`/movies/details/${id}`);

    dispatch(movieDetailsSuccess(response.data.movie));
  } catch (error) {
    dispatch(
      movieFailure(
        error.response?.data?.message ||
          "Failed to load movie details"
      )
    );

    throw error;
  }
};