import { createSlice } from "@reduxjs/toolkit";
// types
interface InitialState {
  isLoginOpen: boolean | null;
  isRegisterOpen: boolean | null;
  isForgetPassOpen: boolean | null;
  isPaymentOpen: boolean | null;
}

// initial state
const initialState: InitialState = {
  isLoginOpen: false,
  isRegisterOpen: false,
  isForgetPassOpen: false,
  isPaymentOpen: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      state.isLoginOpen = !state.isLoginOpen;
      state.isRegisterOpen = false;
      state.isForgetPassOpen = false;
      state.isPaymentOpen = false;
    },
    toggleRegisterModal: (state) => {
      state.isRegisterOpen = !state.isRegisterOpen;
      state.isLoginOpen = false;
      state.isForgetPassOpen = false;
      state.isPaymentOpen = false;
    },
    toggleForgetPassModal: (state) => {
      state.isForgetPassOpen = !state.isForgetPassOpen;
      state.isLoginOpen = false;
      state.isRegisterOpen = false;
      state.isPaymentOpen = false;
    },
    togglePaymentModal: (state) => {
      state.isPaymentOpen = !state.isPaymentOpen;
      state.isForgetPassOpen = false;
      state.isLoginOpen = false;
      state.isRegisterOpen = false;
    }
  }
});

export const { toggleLoginModal, toggleRegisterModal, toggleForgetPassModal, togglePaymentModal } = modalSlice.actions;
export default modalSlice.reducer;

// helper functions
export const getLoginOpen = (state: any) => state.modal.isLoginOpen;
export const getRegisterOpen = (state: any) => state.modal.isRegisterOpen;
export const getForgetPassOpen = (state: any) => state.modal.isForgetPassOpen;
export const getPaymentOpen = (state: any) => state.modal.isPaymentOpen;
