import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpSuccess from "./pages/SignUpSuccess";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthLayout from "./components/auth/AuthLayout";
import FamilyMember from "./pages/FamilyMember";
import FamilyMemberRegister from "./pages/FamilyMemberRegister";
import Record from "./pages/Record";
import Calendars from "./pages/Calendars";
import Todo from "./pages/Todo";
import QRcode from "./components/navbar/qrcode/QRcode"


function App() {
  const token = localStorage.getItem("faccesstoken");

  // const checkfamilymember = localStorage.getItem("")
  return (
    <div className="App">
        {/* <AuthLayout component={<Navbar />} authenticated={token} /> */}
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/findpassword" element={<SignUp />} />
        <Route path="/SignUpSuccess" element={<SignUpSuccess />} />
        <Route path="/FamilyMember" element={<FamilyMember />} />
        <Route path="/todo" element={<Todo />}/>
        <Route
          path="/FamilyMemberRegister"
          element={<FamilyMemberRegister />}
        />
        <Route path="/Record" element={<Record />} />
        <Route path="/Calendars" element={<Calendars/>} />
        <Route path="/qrcode" element={<QRcode />} />
      </Routes>
    </div>
  );
}

export default App;
