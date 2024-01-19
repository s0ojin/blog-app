import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { getDocs, query, collection, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import PostCard from "../components/postCard";

export default function Home() {
  const [postList, setPostList] = useState();
  const [isMyPostTab, setIsMyPostTab] = useState(false);
  const user = auth.currentUser;

  const getPosts = async () => {
    const postsRef = isMyPostTab
      ? query(collection(db, "posts"), where("authorId", "==", user.uid))
      : query(collection(db, "posts"));
    const postsSnap = await getDocs(postsRef);

    const posts = [];
    postsSnap.forEach((post) => {
      posts.push({
        data: post.data(),
        id: post.id,
      });
    });
    setPostList(posts);
  };

  useEffect(() => {
    getPosts();
  }, [isMyPostTab]);

  return (
    <>
      <Carousel />
      <main className="my-14 mx-[200px]">
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => {
              setIsMyPostTab(false);
            }}
            className={`p-2 font-bold ${!isMyPostTab && "border-b-2"}`}>
            All Posts
          </button>
          <button
            onClick={() => {
              setIsMyPostTab(true);
            }}
            className={`p-2 font-bold ${isMyPostTab && "border-b-2"}`}>
            My Posts
          </button>
        </div>
        <ul className="grid grid-cols-4 gap-10 cursor-pointer">
          {postList &&
            postList.map((post) => <PostCard key={post.id} postData={post} />)}
        </ul>
      </main>
    </>
  );
}
