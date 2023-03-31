import { createSlice, current } from "@reduxjs/toolkit";

const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: null,
    isLogged: false,
  },
  reducers: {
    renderUserDetails: (state, action) => {
      state.user = action.payload;
      state.isLogged = true
    },
    loggedOut : (state) =>{
      state.user = null,
      state.isLogged = false;
    }
  },
});

export const { renderUserDetails, loggedOut } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
