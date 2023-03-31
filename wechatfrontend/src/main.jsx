import React from "react";
import ReactDOM from "react-dom/client";
import SocketProvider from "../context/Socket-Context";
import ReduxProvider from "../store/redux-store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider>
      <SocketProvider>   
      <App />
      </SocketProvider>
    </ReduxProvider>
  </React.StrictMode>
);
