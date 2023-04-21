import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer/userReducer";
import postReducer from "./postReducer/postReducer";
export const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispathType = typeof store.dispatch;
