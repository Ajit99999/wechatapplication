import { useContext, useEffect, useReducer, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut, renderUserDetails } from "../store/Slices/CurrentUserSlice";
import { SocketContext } from "../context/Socket-Context";
import { set_users } from "../store/Slices/OnlineUsersSlice";

const authReducer = (state, action) => {
  if (action.type === "SUCCESS") {
    return {
      user: action.payload,
      errorValue: null,
      isLoading: false,
    };
  } else if (action.type === "FAIL") {
    return {
      user: {},
      errorValue: action.payload,
      isLoading: false,
    };
  } else if (action.type === "PENDING") {
    return {
      user: null,
      errorValue: null,
      isLoading: true,
    };
  }

  return state;
};
const useAuth = () => {
  const [initialRenderCheck, setInitialRenderCheck] = useState(false);
  const dispatchRedux = useDispatch();
  const currentUser = useSelector((store) => store.currentUser.user);
  const { socket } = useContext(SocketContext);

  const [authState, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: false,
    errorValue: null,
  });
  const nav = useNavigate();

  useEffect(() => {
    function checkUserAuth() {
      const userDetails = JSON.parse(sessionStorage.getItem("key"));
      if (userDetails) {
        dispatchRedux(renderUserDetails(userDetails));
      }
      setInitialRenderCheck(true);
    }
    checkUserAuth();
  }, []);

  const signIn = async function (data) {
    try {
      const { email, password } = data;
      dispatch({
        type: "PENDING",
      });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDetails = {
        email: userCredential.user.email,
        name: userCredential.user.displayName,
        id: userCredential.user.uid,
      };

      dispatch({
        type: "SUCCESS",
        payload: userDetails,
      });
      sessionStorage.setItem("key", JSON.stringify(userDetails));
      dispatchRedux(renderUserDetails(userDetails));
    } catch (err) {
      dispatch({
        type: "FAIL",
        payload: err.message,
      });
      console.log(err.message);
    }
  };

  const signUp = async function (data) {
    try {
      const { email, password, name } = data;
      console.log(email, password);
      dispatch({
        type: "PENDING",
      });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      const userDetails = {
        email: userCredential.user.email,
        name: userCredential.user.displayName,
        id: userCredential.user.uid,
      };
      dispatch({
        type: "SUCCESS",
        payload: userDetails,
      });

      try {
        const userObj = await addDoc(collection(db, "users"), {
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          id: userCredential.user.uid,
        });

        sessionStorage.setItem("key", JSON.stringify(userDetails));
        dispatchRedux(renderUserDetails(userDetails));

        nav("/chats");
      } catch (err) {
        console.log(err.message);
        throw err;
      }
    } catch (err) {
      dispatch({
        type: "FAIL",
        payload: err.message,
      });
      console.log(err.message);
    }
  };

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      if (JSON.parse(sessionStorage.getItem("key"))) {
        sessionStorage.removeItem("key");
        dispatchRedux(loggedOut());
      }

      socket.current?.emit("remove_user", currentUser?.id);
      socket.current?.on("get-users", (users) => {
        dispatchRedux(set_users(users));
      });
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    signIn,
    signUp,
    authState,
    signOutHandler,
    initialRenderCheck,
  };
};

export default useAuth;
