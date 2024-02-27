import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  token: string | null;
}

const initialState: InitialState = {
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state, action) {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    clearCredentials(state) {
      state.token = null;
    }
  }
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: any) => state.root.auth.token;
