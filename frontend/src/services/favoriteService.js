import api from "./api";

import {
  favoriteStart,
  fetchFavoritesSuccess,
  addFavoriteSuccess,
  removeFavoriteSuccess,
  favoriteFailure,
} from "../features/favorites/favoriteSlice";

// Get Favorites
export const fetchFavorites = async (dispatch) => {
  dispatch(favoriteStart());

  try {
    const response = await api.get("/favorites");

    dispatch(fetchFavoritesSuccess(response.data.favorites));
  } catch (error) {
    dispatch(
      favoriteFailure(
        error.response?.data?.message ||
          "Failed to load favorites"
      )
    );

    throw error;
  }
};

// Add Favorite
export const addFavorite = async (movie, dispatch) => {
  dispatch(favoriteStart());

  try {
    const response = await api.post("/favorites", {
      tmdbId: movie.id,
      title: movie.title || movie.name,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    });

    dispatch(addFavoriteSuccess(response.data.favorite));
  } catch (error) {
    dispatch(
      favoriteFailure(
        error.response?.data?.message ||
          "Failed to add favorite"
      )
    );

    throw error;
  }
};

// Remove Favorite
export const removeFavorite = async (tmdbId, dispatch) => {
  dispatch(favoriteStart());

  try {
    await api.delete(`/favorites/${tmdbId}`);

    dispatch(removeFavoriteSuccess(tmdbId));
  } catch (error) {
    dispatch(
      favoriteFailure(
        error.response?.data?.message ||
          "Failed to remove favorite"
      )
    );

    throw error;
  }
};