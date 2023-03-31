import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import CurrentUserSlice from "./Slices/CurrentUserSlice";
import OnlineUsersSlice from "./Slices/OnlineUsersSlice";



const store = configureStore({
  reducer: {
    
    currentUser: CurrentUserSlice,
    onlineusers : OnlineUsersSlice
  },
});

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxProvider;
