import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageImport from "redux-persist/lib/storage";

const storage = storageImport.default ?? storageImport;
import authReducer from "../features/auth/authSlice";
import movieReducer from "../features/movies/movieSlice";
import favoriteReducer from "../features/favorites/favoriteSlice";
import uiReducer from "../features/ui/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  favorites: favoriteReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["auth"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;