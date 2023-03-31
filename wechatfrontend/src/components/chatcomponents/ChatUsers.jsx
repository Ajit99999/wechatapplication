
import { lazy, Suspense, useEffect} from "react";
import useGetSpecificUserDetails from "../../../hooks/useGetSpecificUserDetails";
import Loading from "../../../util/Loading";
import { checkOnlineStatus } from "../../../util/OnlineStatus";
const ChatUserItem = lazy(() => import("./ChatUserItem"));
const ChatUsers = ({ members, chatId, currentUser, onlineUsers }) => {
  const { getUserDetails, usersDetails } = useGetSpecificUserDetails("users");
  useEffect(() => {
    try {
      const otherUser = members?.find((elem) => elem != currentUser);
      getUserDetails(otherUser);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <>
      {usersDetails && (
        <Suspense fallback={<Loading />}>
          <ChatUserItem
            {...usersDetails}
            currentUser={currentUser}
            chatId={chatId}
            status={checkOnlineStatus(onlineUsers, usersDetails?.id)}
          />
        </Suspense>
      )}
    </>
  );
};

export default ChatUsers;
