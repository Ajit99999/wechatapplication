import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Body from "./pages/Body";
import ChatHomeRoom from "./components/chatcomponents/ChatHomeRoom";
import Login from "./components/accountcomponents/Login";
import Signup from "./components/accountcomponents/Signup";
import ChatBox from "./components/chatcomponents/ChatBox";



function App() {

 
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <Login/>,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/chats",
          element: <ChatHomeRoom />,
          children:[
            {
              path: "/chats/singleChatUser/:userId/:chatId/:currentUser",
              element: <ChatBox/>,
            },
          ]
        },
       
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
