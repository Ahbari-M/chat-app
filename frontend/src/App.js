import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";
import ChatRoom from "./components/ChatRoom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />}>
        <Route index path="/" element={'new chat room'} />
        <Route path="/chat/:id" element={<ChatRoom />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
   </Routes>
  );
}

export default App;
