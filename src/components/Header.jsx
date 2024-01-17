import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const authState = useAuthState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        alert("로그아웃이 완료되었습니다.");
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="w-full h-[60px] p-4 flex items-center">
      <div className="text-[24px] font-bold">
        <Link to="/">BLOG</Link>
      </div>
      {authState.isAuthentication ? (
        <>
          <p className="ml-auto mr-3">{authState.user.email} 님, 안녕하세요!</p>
          <button className="w-[80px] h-[40px] bg-slate-200 rounded-lg mr-3">
            <Link to="/mypage">마이페이지</Link>
          </button>
          <button
            onClick={logoutHandler}
            className="w-[80px] h-[40px] bg-slate-200 rounded-lg">
            로그아웃
          </button>
        </>
      ) : (
        <button className="w-[80px] h-[40px] bg-slate-200 rounded-lg ml-auto">
          <Link to="/login">로그인</Link>
        </button>
      )}
    </div>
  );
}
