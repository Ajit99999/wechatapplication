import { db } from "../firebase/config";
import { addDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

const useMessageHook = (collectionName) => {
  const currentUserRedux = useSelector((store) => store.currentUser.user);
  const [messageList, setMessageList] = useState(null);
  async function createNewMessage({
    chatId,
    currentUser,
    inputTextMessage,
    time,
  }) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        chatId: chatId,
        senderId: currentUser,
        text: inputTextMessage,
        time,
      });
      console.log("Message Document written with ID: ", docRef);
      return new Promise((res) => {
        res(docRef.id);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function retriveMessage(chatId) {
    try {
      const messageCollection = collection(db, collectionName);
      const q = query(messageCollection, where("chatId", "==", chatId));

      let messageDetails = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messageDetails = [
          ...messageDetails,
          {
            ...data,
            messageId: doc.id,
          },
        ];
      });
      messageDetails.sort((a, b) => {
        if (a.time > b.time) {
          return 1;
        } else {
          return -1;
        }
      });

      setMessageList(messageDetails);
    } catch (err) {
      setMessageList([]);
      console.log(err.message);
    }
  }
  return {
    createNewMessage: createNewMessage,
    messageList,
    setMessageList,
    retriveMessage: retriveMessage,
  };
};

export default useMessageHook;
