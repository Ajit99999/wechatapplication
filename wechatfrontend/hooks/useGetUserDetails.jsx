import { async } from "@firebase/util";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { query, where } from "firebase/firestore";
const userGetUserDetails = (collectionName) => {
  const [usersList, setUserList] = useState(null);
  const [errorValue, setErrorValue] = useState(null);
  const userIsPresent = useRef();

  const currentUser = useSelector((store) => store.currentUser.user);

  async function getUser(data) {
    try {
      setErrorValue(null);

      const querySnapshot = await getDocs(collection(db, collectionName));
      let userDetails = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userDetails = [...userDetails, data];
      });

      const otherUsers = userDetails?.filter(
        (user) => user.id !== currentUser?.id
      );

      const newUser = otherUsers?.find((user) => {
        if (user.name?.toUpperCase()?.includes(data.toUpperCase())) {
          return user;
        }
      });
      if (newUser) {
        const chatCollection = collection(db, "chat");
        const q = query(
          chatCollection,
          where("members", "array-contains", currentUser?.id)
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

        userIsPresent.current = false;
        chatDetails.forEach((elem) => {
          if (
            elem.members.includes(currentUser.id) &&
            elem.members.includes(newUser.id)
          ) {
            userIsPresent.current = true;
          }
        });
        if (!userIsPresent.current) {
          setUserList([newUser]);
        }
        else
        {
          setUserList([])
        }
      }
      else
      {
        setUserList([])
      }
    } catch (err) {
      setErrorValue(err.message);
      setUserList([]);
      console.log(err.message);
    }
  }

  return {
    usersList: usersList,
    errorValue: errorValue,
    getUser,
    setUserList
  };
};

export default userGetUserDetails;
