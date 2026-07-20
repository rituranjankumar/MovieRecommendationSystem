import api from "./api";

import {
  movieStart,
  similarMoviesSuccess,
  personalizedMoviesSuccess,
  movieFailure,
} from "../features/movies/movieSlice";

 
// Similar Movies
 

export const fetchSimilarMovies = async (
  movieId,
  dispatch
) => {
  dispatch(movieStart());

  try {
    const response = await api.get(
      `/recommendations/similar/${movieId}`
    );

    dispatch(
      similarMoviesSuccess(response.data.movies)
    );

    return response.data;
  } catch (error) {
       // Movie not present in ML dataset
    if (error.response?.status === 404) {
      dispatch(similarMoviesSuccess([]));
      return;
    }
    dispatch(
      movieFailure(
        error.response?.data?.message ||
          "Failed to load similar movies"
      )
    );

    throw error;
  }
};

 
// Personalized Recommendations
 

export const fetchRecommendations = async (
  dispatch
) => {
  dispatch(movieStart());

  try {
    const response = await api.get(
      "/recommendations/personalized"
    );

    dispatch(
      personalizedMoviesSuccess(
        response.data.movies
      )
    );

    return response.data;
  } catch (error) {
    dispatch(
      movieFailure(
        error.response?.data?.message ||
          "Failed to load recommendations"
      )
    );

    throw error;
  }
};