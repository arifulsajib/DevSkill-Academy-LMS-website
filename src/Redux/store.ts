import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/toggle/themeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./features/toggle/modalSlice";
import authReducer from "./features/auth/authSlice";
import usersReducer from "./features/auth/usersSlice";
import { apiSlice } from "./features/api/apiSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer
  //   add reducers that you want to persist
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configAppStore = configureStore({
  reducer: {
    root: persistedReducer,
    modal: modalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware),
  devTools: import.meta.env.VITE_ENV !== "production" ? true : false
});

export type RootState = ReturnType<typeof configAppStore.getState>;
export type AppDispatch = typeof configAppStore.dispatch;
