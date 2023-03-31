import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import Header from "./Header";

const Body = () => {
  const { initialRenderCheck } = useAuth();

  return (
    <div>
      <Header />
      {initialRenderCheck && <Outlet />}
    </div>
  );
};

export default Body;
