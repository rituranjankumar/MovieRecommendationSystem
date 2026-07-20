import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trending: [],
  popular: [],
  topRated: [],
  nowPlaying: [],

  searchResults: [],
  selectedMovie: null,

  // Recommendation States
  similarMovies: [],
  personalizedMovies: [],

  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,

  reducers: {
    movieStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    homeMoviesSuccess: (state, action) => {
      state.loading = false;

      state.trending = action.payload.trending;
      state.popular = action.payload.popular;
      state.topRated = action.payload.topRated;
      state.nowPlaying = action.payload.nowPlaying;
    },

    searchMoviesSuccess: (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
    },

    movieDetailsSuccess: (state, action) => {
      state.loading = false;
      state.selectedMovie = action.payload;
    },

    similarMoviesSuccess: (state, action) => {
      state.loading = false;
      state.similarMovies = action.payload;
    },

    personalizedMoviesSuccess: (state, action) => {
      state.loading = false;
      state.personalizedMovies = action.payload;
    },

    movieFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
    },

    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
});

export const {
  movieStart,
  homeMoviesSuccess,
  searchMoviesSuccess,
  movieDetailsSuccess,
  similarMoviesSuccess,
  personalizedMoviesSuccess,
  movieFailure,
  clearSearchResults,
  clearSelectedMovie,
} = movieSlice.actions;

export default movieSlice.reducer;