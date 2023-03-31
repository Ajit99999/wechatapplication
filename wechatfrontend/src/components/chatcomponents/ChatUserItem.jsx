import Avvvatars from "avvvatars-react";
import { Link, useParams } from "react-router-dom";
import { RiChat4Fill, RiChatOffFill } from "react-icons/ri";
const ChatUserItem = ({
  name,
  id: otheruserId,
  currentUser,
  chatId,
  status,
}) => {
  const { userId } = useParams();
  
  return (
    <Link to={`/chats/singleChatUser/${otheruserId}/${chatId}/${currentUser}`}>
      <div
        className={`${
          userId === otheruserId ? "bg-gray-300" : ""
        }  w-64 h-20 px-4 py-2 border-gray-200 hover:border-gray-400 cursor-pointer border  my-1`}
      >
        <div className="flex items-center gap-6">
          <Avvvatars
            value={name}
            displayValue={name}
            size={"42"}
            shadow={true}
          />
          <p className="font-semibold text-sm">{name}</p>
        </div>
        <div className="flex justify-end items-center gap-2 ">
          {status ? (
            <RiChat4Fill className="text-green-800" />
          ) : (
            <RiChatOffFill className="text-red-800" />
          )}
          <p
            className={`text-sm ${
              status ? "text-green-800" : "text-red-800"
            }  `}
          >
            {" "}
            {status ? "Online" : "Offline"}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChatUserItem;
