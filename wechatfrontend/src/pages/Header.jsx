import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const currentUser = useSelector((store) => store.currentUser);
  const { signOutHandler } = useAuth();
  
  return (
    <div className="flex flex-row items-center justify-between bg-blue-100 ">
      <div className="mx-8 my-2 px-6 py-2  bg-blue-400 rounded-md max-sm:mx-2  cursor-pointer">
        <p className="font-bold">We Chat</p>
      </div>
      {currentUser?.isLogged && (
        <div className="mx-8 flex flex-row justify-center items-center max-sm:mx-2 max-sm:gap-1 gap-5">
          <Link to={"/chats"}>
            <button className="px-4 py-2 border hover:bg-blue-300  hover:rounded-sm hover:border-black">
              {" "}
              Home{" "}
            </button>
          </Link>

          <button
            onClick={() => {
              signOutHandler();
            }}
            className="px-4 py-2 border hover:rounded-sm hover:bg-blue-300 hover:border-black "
          >
            Sign out
          </button>
          <p> Welcome {currentUser?.user?.name} </p>
        </div>
      )}
    </div>
  );
};

export default Header;
