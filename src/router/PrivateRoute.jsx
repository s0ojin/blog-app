import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../contexts/AuthContext";

export default function PrivateRoute({ authentication }) {
  const authState = useAuthState();

  if (authentication) {
    //로그인해야 볼 수 있는 페이지
    return authState.isAuthentication === false ? (
      <Navigate to="/login" />
    ) : (
      <Outlet />
    );
  } else {
    //로그아웃 상태여야 볼 수 있는 페이지
    return authState.isAuthentication === false ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  }
}
