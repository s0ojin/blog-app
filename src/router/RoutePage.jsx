import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Mypage from "../pages/Mypage";

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}
