import { createSlice } from "@reduxjs/toolkit";
// types
interface InitialState {
  isLoginOpen: boolean | null;
  isRegisterOpen: boolean | null;
}

// initial state
const initialState: InitialState = {
  isLoginOpen: false,
  isRegisterOpen: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      state.isLoginOpen = !state.isLoginOpen;
      state.isRegisterOpen = false;
    },
    toggleRegisterModal: (state) => {
      state.isRegisterOpen = !state.isRegisterOpen;
      state.isLoginOpen = false;
    }
  }
});

export const { toggleLoginModal, toggleRegisterModal } = modalSlice.actions;
export default modalSlice.reducer;

// helper functions
export const getLoginOpen = (state: any) => state.modal.isLoginOpen;
export const getRegisterOpen = (state: any) => state.modal.isRegisterOpen;
