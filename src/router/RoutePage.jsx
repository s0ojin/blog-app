import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Mypage from "../pages/Mypage";

export default function RoutePage() {
  return (
    <Routes>
      {/* 로그인 무관 */}
      {/* 로그인 필수 */}
      <Route element={<PrivateRoute authentication={true} />}>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
      </Route>
      {/* 로그아웃 필수 */}
      <Route element={<PrivateRoute authentication={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
