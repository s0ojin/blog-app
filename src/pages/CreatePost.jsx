import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function CreatePost() {
  const { postId } = useParams();
  const user = auth.currentUser;
  const { register, handleSubmit, setValue } = useForm();
  const editPagePath = useMatch("/post/edit/:postId");
  const editPagePostData = useLocation().state;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // TODO: 이미지 링크로 변경 저장
    if (editPagePath) {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        capital: true,
        title: data.title,
        content: data.content,
        summary: data.summary,
        image: "https://images.velog.io/velog.png",
      })
        .then(() => {
          alert("글 수정이 완료되었습니다.");
          navigate(`/post/${postId}`);
        })
        .catch((err) =>
          alert("에러가 발생했습니다. 잠시 후 다시 시도해주세요."),
        );
    } else {
      await addDoc(collection(db, "posts"), {
        author: user.displayName,
        authorId: user.uid,
        title: data.title,
        content: data.content,
        summary: data.summary,
        image: "https://images.velog.io/velog.png",
        createdAt: Timestamp.now(),
      })
        .then(() => {
          alert("글 작성이 완료되었습니다.");
          navigate("/");
        })
        .catch((err) =>
          alert("에러가 발생했습니다. 잠시 후 다시 시도해주세요."),
        );
    }
  };

  useEffect(() => {
    if (editPagePath) {
      setValue("title", editPagePostData.title);
      setValue("summary", editPagePostData.summary);
      setValue("content", editPagePostData.content);
    }
  }, []);

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
        <button type="submit" className="submit_btn">
          {editPagePath ? "수정하기" : "업로드"}
        </button>
      </form>
    </div>
  );
}
