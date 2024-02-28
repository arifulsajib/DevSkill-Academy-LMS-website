import { createSlice } from "@reduxjs/toolkit";
// types
interface InitialState {
  isLoginOpen: boolean | null;
  isRegisterOpen: boolean | null;
  isForgetPassOpen: boolean | null;
}

// initial state
const initialState: InitialState = {
  isLoginOpen: false,
  isRegisterOpen: false,
  isForgetPassOpen: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      state.isLoginOpen = !state.isLoginOpen;
      state.isRegisterOpen = false;
      state.isForgetPassOpen = false;
    },
    toggleRegisterModal: (state) => {
      state.isRegisterOpen = !state.isRegisterOpen;
      state.isLoginOpen = false;
      state.isForgetPassOpen = false;
    },
    toggleForgetPassModal: (state) => {
      state.isForgetPassOpen = !state.isForgetPassOpen;
      state.isLoginOpen = false;
      state.isRegisterOpen = false;
    }
  }
});

export const { toggleLoginModal, toggleRegisterModal, toggleForgetPassModal } = modalSlice.actions;
export default modalSlice.reducer;

// helper functions
export const getLoginOpen = (state: any) => state.modal.isLoginOpen;
export const getRegisterOpen = (state: any) => state.modal.isRegisterOpen;
export const getForgetPassOpen = (state: any) => state.modal.isForgetPassOpen;
