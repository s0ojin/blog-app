import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      alert(error.message);
    }
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
          {...register("password", {
            required: true,
            pattern: {
              value: /.{6,}/,
              message: "비밀번호는 6글자 이상으로 생성할 수 있습니다.",
            },
          })}
          placeholder="비밀번호"
          className="input"
        />
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          id="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: true,
            validate: (val) => {
              if (watch("password") != val) {
                return "비밀번호 확인이 일치하지 않습니다.";
              }
            },
          })}
          className="input"
          placeholder="비밀번호 확인"
        />
        <span>{errors?.passwordConfirm?.message}</span>
        <button type="submit" className="submit_btn mt-10">
          회원가입
        </button>
      </form>
    </div>
  );
}
