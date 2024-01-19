import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { timeConverter } from "../utils/timeConverter";

export default function PostDetail() {
  const { postId } = useParams();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [postData, setPostData] = useState();

  const getData = async () => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPostData(docSnap.data());
    }
  };

  const postDeleteHandler = async () => {
    await deleteDoc(doc(db, "posts", postId)).then(() => {
      alert("삭제되었습니다.");
      navigate("/");
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col w-[50%] mx-auto mt-28">
      {postData && (
        <>
          <h1 className="text-[42px] font-bold mb-8">{postData.title}</h1>
          <div className="flex gap-4 mb-14">
            <p className="font-bold">by. {postData.author}</p>
            <p className="text-gray-600">{timeConverter(postData.createdAt)}</p>
            {postData.authorId == user.uid && (
              <div className="ml-auto flex gap-4">
                <button className="text-gray-400">
                  <Link to={`/post/edit/${postId}`} state={postData}>
                    수정
                  </Link>
                </button>
                <button onClick={postDeleteHandler} className="text-gray-400">
                  삭제
                </button>
              </div>
            )}
          </div>
          <div>
            <img
              src={postData.image}
              className="w-full h-[500px] object-cover mb-20"
            />
            <hr />
            <p className="my-10 text-[18px]">{postData.summary}</p>
            <hr />
            <p className="my-16">{postData.content}</p>
          </div>
        </>
      )}
    </div>
  );
}
