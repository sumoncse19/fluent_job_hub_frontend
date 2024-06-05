import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  authKey: number,
  email: string | null,
  name: string | null,
  _id: string | null,
}

interface IUserInfo {
  user: IUser,
}

const initialState: IUserInfo = {
  user: {
    authKey: 0,
    email: null,
    name: null,
    _id: null,
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    resetUser: (state) => {
      state.user = initialState.user;
    }
  }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer