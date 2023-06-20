import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";


function App() {
  return (
    <Routes>
      <Route index path="/" element={<Chat />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
   </Routes>
  );
}

export default App;
