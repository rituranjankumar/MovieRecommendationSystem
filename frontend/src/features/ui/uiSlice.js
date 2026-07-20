import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },

    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },

    setToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  setToast,
} = uiSlice.actions;

export default uiSlice.reducer;