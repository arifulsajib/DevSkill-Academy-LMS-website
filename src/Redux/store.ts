import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/toggle/themeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./features/toggle/modalSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const rootReducer = combineReducers({
  theme: themeReducer
  //   add reducers that you want to persist
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configAppStore = configureStore({
  reducer: {
    root: persistedReducer,
    modal: modalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: import.meta.env.REACT_APP_ENV !== "production"
});

export type RootState = ReturnType<typeof configAppStore.getState>;
export type AppDispatch = typeof configAppStore.dispatch;
