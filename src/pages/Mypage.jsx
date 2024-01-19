import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Mypage() {
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        alert("로그아웃이 완료되었습니다.");
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
}
