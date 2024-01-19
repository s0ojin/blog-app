import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { getDocs, query, collection, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";

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
            postList.map((post) => (
              <Link key={post.id} to={`/post/${post.id}`}>
                <li className="flex flex-col shadow-lg rounded-2xl min-h-[380px]">
                  <img src={post.data.image} className="h-[45%] object-cover" />
                  <div className="h-[45%] p-4 flex flex-col grow">
                    <p className="font-bold text-[18px] mb-2">
                      {post.data.title}
                    </p>
                    <p className="grow text-[14px]">
                      {post.data.content < 60
                        ? post.data.content
                        : `${post.data.content.slice(0, 60)} ...`}
                    </p>
                    <p className="mt-auto text-[12px] text-gray-400">
                      {Date(post.data.createdAt)}
                    </p>
                  </div>
                  <p className="h-[10%] p-4 leading-3 text-[14px]">
                    by. {post.data.author}
                  </p>
                </li>
              </Link>
            ))}
        </ul>
      </main>
    </>
  );
}
