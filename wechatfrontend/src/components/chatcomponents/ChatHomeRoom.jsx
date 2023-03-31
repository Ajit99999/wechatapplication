import { useEffect, useState, lazy, Suspense } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../util/Loading";
import useChatHook from "../../../hooks/useChatHook";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../../../context/Socket-Context";
import { set_users } from "../../../store/Slices/OnlineUsersSlice";
const SearchChatUsers = lazy(() => import("./SearchChatUsers"));
const ChatUsers = lazy(() => import("./ChatUsers"));
const ChatBox = lazy(() => {
  return import("./ChatBox");
});
const ChatBoxLandingPage = lazy(() => import("./ChatBoxLandingPage"));
const ChatHomeRoom = () => {
  const currentUserRedux = useSelector((store) => store.currentUser.user);
  const onlineUsers = useSelector((store) => store.onlineusers.users);
  const isLoggedIn = useSelector((store) => store.currentUser.isLogged);
  const { socket } = useContext(SocketContext);
  const { retriveChat, chatList, setChatList } = useChatHook("chat");
  const [showChatBox, setShowChatBox] = useState(false);
  const nav = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserRedux?.id) {
      retriveChat(currentUserRedux?.id, "chat");
    }
  }, []);

  useEffect(() => {
    if (currentUserRedux?.id) {
      socket.current = io(`https://wechat-k381.onrender.com/`);
      socket.current.emit("add-new-users", currentUserRedux?.id);
      socket.current.on(`get-users`, (users) => {
        dispatch(set_users(users));
      });
    }
  }, [currentUserRedux?.id]);

  useEffect(() => {
    if (pathname.includes("singleChatUser")) {
      setShowChatBox(true);
    } else {
      setShowChatBox(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isLoggedIn) {
      nav("/");
    }
  }, [isLoggedIn]);

  const updateChatListHandler = (data) => {
    setChatList((prev) => [...prev, data]);
  };

  return (
    <div className="flex flex-row max-sm:flex-col h-auto">
      <div
        id="chat-left-sidebar"
        className="h-screen w-1/4 bg-gray-200 max-sm:h-auto max-sm:w-screen flex items-center flex-col"
      >
        <div className="bg-blue-200 w-full py-4 text-center mb-3">
          <p className="font-semibold text-md py-1"> Your chat messages </p>{" "}
        </div>
        <Suspense fallback={<Loading />}>
          {chatList &&
            chatList.map((chat) => {
              return (
                <ChatUsers
                  {...chat}
                  currentUser={currentUserRedux?.id}
                  key={chat?.chatId}
                  onlineUsers={onlineUsers}
                />
              );
            })}
        </Suspense>
        {chatList?.length === 0 && (
          <div className="">
            <p> No chats found.Please create a new chat</p>
          </div>
        )}
      </div>
      <div
        id="chat-right-chatroom"
        className="h-screen w-2/4 bg-white max-sm:w-screen"
      >
        <Suspense fallback={<Loading />}>
          {showChatBox ? <ChatBox /> : <ChatBoxLandingPage />}
        </Suspense>
      </div>

      <div className="w-auto bg-gray-200 h-screen">
        <Suspense fallback={<Loading />}>
          <SearchChatUsers updateChatListHandler={updateChatListHandler} />
        </Suspense>
      </div>
    </div>
  );
};

export default ChatHomeRoom;
