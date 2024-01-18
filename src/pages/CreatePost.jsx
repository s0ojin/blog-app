import { useForm } from "react-hook-form";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function CreatePost() {
  const { register, handleSubmit } = useForm();
  const user = auth.currentUser;

  const onSubmit = async (data) => {
    console.log(data);
    // TODO: 이미지 링크로 변경 저장, author 변경

    await addDoc(collection(db, "posts"), {
      author: user.displayName,
      title: data.title,
      content: data.content,
      summary: data.summary,
      image: "",
      createdAt: Timestamp.now(),
    });
  };

  return (
    <div className="p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-[70%] h-screen flex flex-col">
        <input
          type="text"
          {...register("title", {
            required: true,
            maxLength: 28,
          })}
          placeholder="제목"
          className="w-full h-24 text-[32px] p-2 outline-none focus:border-b-2 mb-10"
        />
        <textarea
          {...register("summary", { required: true, maxLength: 100 })}
          placeholder="글 본문을 100자 이내로 요약해서 입력해주세요!"
          className="w-full h-24 p-2 mb-10 outline-slate-300"
        />
        <input type="file" {...register("image")} className="mb-10" />
        <textarea
          {...register("content", {
            required: true,
            maxLength: 10000,
          })}
          placeholder="글 본문을 적어주세요~"
          className="w-full h-[70%] p-2 outline-slate-300 mb-10"
        />
        <button className="submit_btn">업로드</button>
      </form>
    </div>
  );
}
