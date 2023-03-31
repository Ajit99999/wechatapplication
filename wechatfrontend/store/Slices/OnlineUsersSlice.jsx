import { createSlice } from "@reduxjs/toolkit";

const OnlineUsersSlice = createSlice({
  name: "onlineusers",
  initialState: {
    "users": []
  },
  reducers: {
    set_users: (state, action) => {
       state.users = action.payload
    },
  },
});

export const { set_users } = OnlineUsersSlice.actions;
export default OnlineUsersSlice.reducer;
