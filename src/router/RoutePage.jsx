import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}
