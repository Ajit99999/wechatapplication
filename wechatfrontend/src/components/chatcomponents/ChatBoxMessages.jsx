import { useEffect, useRef, useState } from "react";
import useMessageHook from "../../../hooks/useMessageHook";
import ChatInputMessage from "./ChatInputMessage";

const ChatBoxMessages = ({ chatId, currentUser, otherUserId }) => {
  const [recivedMessage, setRecivedMessage] = useState(null);
  const scrollIntoMessage = useRef();
  const { retriveMessage, messageList, setMessageList } =
    useMessageHook("message");
  useEffect(() => {
    retriveMessage(chatId);
  }, [chatId]);

  useEffect(() => {
    scrollIntoMessage.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messageList]);

  useEffect(() => {
    if (
      recivedMessage != null &&
      recivedMessage.chatId === chatId &&
      recivedMessage.senderId !== currentUser
    ) {
      setMessageList((prev) => [...prev, recivedMessage]);
    }
  }, [recivedMessage]);

  return (
    <div className="w-auto h-5/6 flex flex-col">
      <div className="py-4 h-4/5 mb-16 overflow-auto bg-gray-500">
        {messageList &&
          messageList.map((message) => {
            return (
              <div key={message?.messageId} ref={scrollIntoMessage}>
                <p
                  className={`${
                    currentUser === message?.senderId
                      ? "float-right bg-green-200"
                      : "float-left bg-sky-200"
                  } px-3 py-2 mx-4 rounded-lg`}
                >
                  {message?.text}
                </p>
                <br />
                <br />
              </div>
            );
          })}
        {messageList?.length === 0 && (
          <>
            {" "}
            <div className="text-center">
              {" "}
              <p className="text-slate-100 text-xl ">
                {" "}
                No messages found...{" "}
              </p>{" "}
            </div>{" "}
          </>
        )}
      </div>

      <ChatInputMessage
      
        setRecivedMessage={setRecivedMessage}
        otherUserId={otherUserId}
        chatId={chatId}
        currentUser={currentUser}
        latestMessage={(data) => {
          setMessageList((prev) => [...prev, data]);
        }}
      />
    </div>
  );
};

export default ChatBoxMessages;
