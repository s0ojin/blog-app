import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import PostCard from "../components/postCard";
import { useAuthState } from "../contexts/AuthContext";

export default function Mypage() {
  const [myPostList, setMyPostList] = useState([]);
  const authState = useAuthState();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        alert("로그아웃이 완료되었습니다.");
      })
      .catch((err) => alert(err));
  };

  const getData = async () => {
    const postsRef = query(
      collection(db, "posts"),
      where("authorId", "==", authState.user.uid),
    );

    const postsSnap = await getDocs(postsRef);

    const posts = [];
    postsSnap.forEach((post) => {
      posts.push({
        data: post.data(),
        id: post.id,
      });
    });
    setMyPostList(posts);
  };

  useEffect(() => {
    if (authState.state === "loaded") getData();
  }, [authState.state]);

  return (
    <div className="w-[60%] mx-auto my-20">
      <div className="flex w-full items-center mb-10">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          className="w-32 h-32 rounded-full border border-gray-300"
        />
        <p className="text-[24px] font-bold ml-4">
          {authState.state == "loaded" && authState.user.displayName}
        </p>
        <button onClick={logoutHandler} className="default_btn ml-auto mr-2">
          로그아웃
        </button>
      </div>
      <hr />
      <p className="text-[24px] font-bold my-10">내가 쓴 글</p>
      <ul className="grid grid-cols-2 gap-10">
        {myPostList.length > 0
          ? myPostList.map((post) => <PostCard key={post.id} postData={post} />)
          : "새로운 글을 작성해보세요!"}
      </ul>
    </div>
  );
}
