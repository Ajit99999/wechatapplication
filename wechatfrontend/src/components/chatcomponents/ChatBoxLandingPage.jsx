import Image from "../../assets/chat.jpg";

const ChatBoxLandingPage = () => {
  return (
    <div className="flex flex-col items-center gap-5 justify-center mx-auto bg-slate-300 h-full">
      <img
        src={Image}
        className="object-cover  h-auto  rounded-md shadow-blue-200 shadow-md w-3/4"
      />
      <div>
        <p className="text-xl">Tap on the users to start conversations</p>
      </div>
    </div>
  );
};
export default ChatBoxLandingPage;
