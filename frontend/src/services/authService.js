import api from "./api";

import {
  authStart,
  authSuccess,
  authFailure,
  logoutSuccess,
} from "../features/auth/authSlice";

// Signup
export const signupUser = async (data, dispatch) => {
  dispatch(authStart());

  try {
    const response = await api.post("/auth/signup", data);

    dispatch(authSuccess(response.data.user));

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Signup failed";

    dispatch(authFailure(message));

    throw error;
  }
};

// Login
export const loginUser = async (data, dispatch) => {
  dispatch(authStart());

  try {
    const response = await api.post("/auth/login", data);

    dispatch(authSuccess(response.data.user));

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed";

    dispatch(authFailure(message));

    throw error;
  }
};

// Logout
export const logoutUser = async (dispatch) => {
  dispatch(authStart());

  try {
    const response = await api.post("/auth/logout");

    dispatch(logoutSuccess());

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Logout failed";

    dispatch(authFailure(message));

    throw error;
  }
};

// Check Authentication
export const checkAuth = async (dispatch) => {
  dispatch(authStart());

  try {
    const response = await api.get("/auth/me");

    dispatch(authSuccess(response.data.user));
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(logoutSuccess());
      return null; // User simply isn't logged in
    }

    dispatch(logoutSuccess());
    throw error; // Throw only unexpected errors
  }
};