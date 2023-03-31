import { db } from "../firebase/config";
import { addDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import userGetUserDetails from "./useGetUserDetails";

const useChatHook = (collectionName) => {
  const currentUserRedux = useSelector((store) => store.currentUser.user);
  const [chatList, setChatList] = useState(null);
  
  async function createNewChat(currentUserId, otherUserId) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        members: [currentUserId, otherUserId],
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef.id
      
     
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // read the chats
  async function retriveChat(currentUserId, collectionName) {
    try {
      const chatCollection = collection(db, collectionName);
      const q = query(
        chatCollection,
        where("members", "array-contains", currentUserId)
      );

      let chatDetails = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        chatDetails = [
          ...chatDetails,
          {
            ...data,
            chatId: doc.id,
          },
        ];
      });
      setChatList(chatDetails);
    } catch (err) {
      setChatList([]);
      console.log(err.message);
    }
  }
  return {
    createNewChat: createNewChat,
    retriveChat: retriveChat,
    chatList: chatList,
    setChatList
  };
};

export default useChatHook;
