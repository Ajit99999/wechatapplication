import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { query, where } from "firebase/firestore";
const useGetSpecificUserDetails = (collectionName) => {
  const [usersDetails, setUserDetails] = useState(null);
  const [errorValue, setErrorValue] = useState(null);

  async function getUserDetails(otherUserId) {
    try {
      const userCollection = collection(db, collectionName);
      if(otherUserId)
      {
        const q = query(userCollection, where("id", "==", otherUserId));

        let userDetailsObj = {};
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userDetailsObj = { ...data };
        });
  
        setUserDetails(userDetailsObj);
      }
     
    } catch (err) {
      setUserDetails({})  
      console.log(err.message);
    }
  }

  return {
    usersDetails: usersDetails,
    getUserDetails: getUserDetails,
  };
};

export default useGetSpecificUserDetails;
