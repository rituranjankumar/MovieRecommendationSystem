import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logoutSuccess,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;