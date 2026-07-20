import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    favoriteStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchFavoritesSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },

    addFavoriteSuccess: (state, action) => {
      state.loading = false;
      state.items.unshift(action.payload);
    },

    removeFavoriteSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter(
        (item) => item.tmdbId !== action.payload
      );
    },

    favoriteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearFavoriteError: (state) => {
      state.error = null;
    },
  },
});

export const {
  favoriteStart,
  fetchFavoritesSuccess,
  addFavoriteSuccess,
  removeFavoriteSuccess,
  favoriteFailure,
  clearFavoriteError,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;