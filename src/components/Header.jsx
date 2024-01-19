import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "../contexts/AuthContext";

export default function Header() {
  const authState = useAuthState();

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
          <button className="w-[80px] h-[40px] bg-slate-200 rounded-lg">
            <Link to="/post/create">새 글 작성</Link>
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
