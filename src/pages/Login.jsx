import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        if (res.operationType == "signIn") {
          localStorage.setItem("userId", res.user.uid);
          localStorage.setItem("accessToken", res.user.accessToken);
          localStorage.setItem("refreshToken", res.user.refreshToken);
          alert("로그인이 완료되었습니다.");
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.code == "auth/invalid-credential") {
          alert("유효하지 않은 계정입니다. 아이디와 비밀번호를 확인해주세요.");
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 min-w-[30rem] w-[70%]">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
          placeholder="이메일"
          className="input"
        />
        <span>{errors?.email?.message}</span>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          placeholder="비밀번호"
          className="input"
        />
        <button type="submit" className="submit_btn mt-10">
          로그인
        </button>
      </form>
      <button className="text-slate-400 mt-24">
        <Link to="/signup">아직 회원이 아니신가요?</Link>
      </button>
    </div>
  );
}
