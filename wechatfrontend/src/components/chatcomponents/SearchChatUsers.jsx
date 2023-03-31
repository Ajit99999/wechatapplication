import userGetUserDetails from "../../../hooks/useGetUserDetails";
import SearchChatInput from "./SearchChatInput";
import SearchChatUsersItem from "./SearchChatUserItem";

const SearchChatUsers = ({ updateChatListHandler }) => {
  const { usersList, getUser, setUserList } = userGetUserDetails(
    "users");

  return (
    <div className="flex flex-col items-center ">
      <div className="bg-blue-200 w-full py-4 text-center mb-3">
          <p className="font-semibold text-md py-1"> Create a new chat </p>{" "}
        </div>

      <SearchChatInput
        HandleInputValue={(data) => {
          getUser(data);
        }}
      />
      {usersList &&
        usersList.map((user) => {
          return (
            <SearchChatUsersItem
              key={user.id}
              {...user}
              createChatHandler={() => {
                setUserList(null);
              }}
              updateChatListHandler={updateChatListHandler}


            />
          );
        })}

      {usersList?.length === 0 && <p> No users found. Please try again </p>}
    </div>
  );
};

export default SearchChatUsers;
