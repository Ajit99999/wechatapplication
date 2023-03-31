import { useContext, useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";

import useMessageHook from "../../../hooks/useMessageHook";
import { SocketContext } from "../../../context/Socket-Context";
const ChatInputMessage = ({
  chatId,
  currentUser,
  latestMessage,
  otherUserId,
  setRecivedMessage,
}) => {
  const { socket } = useContext(SocketContext);
  const { createNewMessage } = useMessageHook("message");
  const [inputTextMessage, setInputTextMessage] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const HandleSubmit = (e) => {
    if (!inputTextMessage) {
      return;
    }

    const promiseObj = createNewMessage({
      chatId,
      currentUser,
      inputTextMessage,
      time: Date.now(),
    });
    promiseObj.then((messageId) => {
      latestMessage({
        messageId,
        chatId,
        senderId: currentUser,
        text: inputTextMessage,
        time: Date.now(),
      });
      setSendMessage({
        messageId,
        chatId,
        senderId: currentUser,
        text: inputTextMessage,
        time: Date.now(),
      });
    });

    setInputTextMessage("");
  };

  useEffect(() => {
    socket.current?.on("get-new-messages", (data) => {
      setRecivedMessage(data);
    });
  }, []);

  useEffect(() => {
    socket.current?.emit("add-new-messages", { ...sendMessage, otherUserId });
  }, [sendMessage]);

  return (
    <div className="flex flex-row items-center">
      <div className="w-4/5">
        <InputEmoji
          value={inputTextMessage}
          onChange={setInputTextMessage}
          cleanOnEnter
          onEnter={HandleSubmit}
        />
      </div>
      <button
        type="button"
        onClick={HandleSubmit}
        className="rounded-sm bg-blue-300 w-1/5 px-4 py-2 text-center border hover:border-black  mx-4"
      >
        Send
      </button>
    </div>
  );
};
export default ChatInputMessage;
