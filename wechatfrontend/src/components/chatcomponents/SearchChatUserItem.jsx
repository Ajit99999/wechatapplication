import Avvvatars from "avvvatars-react";
import { useSelector } from "react-redux";
import useChatHook from "../../../hooks/useChatHook";
import userGetUserDetails from "../../../hooks/useGetUserDetails";

const SearchChatUsersItem = ({
  id: otherUserId,
  name,
  createChatHandler,
  updateChatListHandler,
}) => {
  const { createNewChat: createNewChatFirebase } = useChatHook("chat");
  const currentUser = useSelector((store) => store.currentUser.user);
  userGetUserDetails("users");
  const ClickHandler = () => {
    createNewChatFirebase(otherUserId, currentUser?.id).then((data) => {
      createChatHandler();
      updateChatListHandler({
        chatId: data,
        members: [currentUser?.id, otherUserId],
      });
    });
  };

  return (
    <div className="border bg-white px-4 py-2 my-2 rounded-md border-gray-2">
      <div className="flex items-center gap-6 ">
        <Avvvatars value={name} displayValue={name} size={"48"} shadow={true} />
        <p className="font-semibold ">{name}</p>
      </div>
      <button
        onClick={ClickHandler}
        className="my-1 px-2 py-1 hover:border  border-black"
      >
        Click here to start new chat
      </button>
    </div>
  );
};

export default SearchChatUsersItem;
