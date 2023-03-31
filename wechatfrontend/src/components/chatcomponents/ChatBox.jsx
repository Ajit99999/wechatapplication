import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../util/Loading";
const ChatBoxMessages = lazy(()=>import('./ChatBoxMessages'))
const ChatBoxHeader = lazy(()=> import('./ChatBoxHeader'))
const ChatBox = () => {
  const { userId: otherUserId, chatId, currentUser } = useParams();

  return (
    <>
      <Suspense fallback={<Loading/>} >   
      <ChatBoxHeader otherUserId={otherUserId} />
      <ChatBoxMessages
        chatId={chatId}
        currentUser={currentUser}
        otherUserId={otherUserId}
      />
      </Suspense>
    </>
  );
};

export default ChatBox;
