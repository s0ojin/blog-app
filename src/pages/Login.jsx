import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
