import { useEffect } from "react";
import Avvvatars from "avvvatars-react";
import useGetSpecificUserDetails from "../../../hooks/useGetSpecificUserDetails";
const ChatBoxHeader = ({ otherUserId }) => {
  const { getUserDetails , usersDetails  }  =  useGetSpecificUserDetails("users")
  useEffect(() => {
     getUserDetails(otherUserId)
  }, [otherUserId]);

  return (
    usersDetails && (
      <div className="flex items-center gap-6 w-auto h-16 px-6 bg-slate-400">
        <Avvvatars
          value={usersDetails?.name}
          displayValue={usersDetails?.name}
          size={"48"}
          shadow={true}
        />
        <p className="font-semibold">{usersDetails?.name}</p>
      </div>
    )
  );
};

export default ChatBoxHeader;
