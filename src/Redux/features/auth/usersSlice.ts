import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models/user.model";

interface InitialState {
  user: User | undefined;
  users: User[] | undefined;
}

const initialState: InitialState = {
  user: undefined,
  users: []
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    }
  }
});

export const { setUser, setUsers } = usersSlice.actions;

export default usersSlice.reducer;

export const selectCurrentUser = (state: any) => state.users.user;
export const selectAllUsers = (state: any) => state.users.users;
