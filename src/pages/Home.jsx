import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [postList, setPostList] = useState();

  const getPosts = async () => {
    const postsRef = query(collection(db, "posts"));
    const postsSnap = await getDocs(postsRef);
    const posts = [];
    postsSnap.forEach((post) => {
      posts.push(post.data());
    });
    setPostList(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Carousel />
      <ul className="grid grid-cols-3 gap-10 m-10 cursor-pointer">
        {postList &&
          postList.map((post, idx) => (
            <li
              key={idx}
              className="flex flex-col max-h-[500px] shadow-lg rounded-2xl">
              <img src={post.image} className="h-[45%] object-cover" />
              <div className="h-[45%] p-4 flex flex-col">
                <p className="font-bold text-[20px] mb-2">{post.title}</p>
                <p className="">{post.content}</p>
                <p className="mt-auto text-[14px] text-gray-400">
                  {Date(post.createdAt)}
                </p>
              </div>
              <p className="h-[10%] p-4">by. {post.author}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
