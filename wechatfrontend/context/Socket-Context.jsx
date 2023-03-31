import { createContext, useRef } from "react";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = useRef();

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
