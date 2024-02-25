import { createSlice } from "@reduxjs/toolkit";
// types
interface InitialState {
  isDark: boolean | null;
}

// initial state
const initialState: InitialState = {
  isDark: true
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

// helper functions
export const selectIsDark = (state: any) => state.root.theme.isDark;
