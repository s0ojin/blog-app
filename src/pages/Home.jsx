import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Home() {
  const [postList, setPostList] = useState();

  const getPosts = async () => {
    const postsRef = query(collection(db, "posts"));
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
  }, []);

  return (
    <div>
      <Carousel />
      <ul className="grid grid-cols-4 gap-10 m-10 cursor-pointer">
        {postList &&
          postList.map((post) => (
            <li
              key={post.id}
              className="flex flex-col max-h-[500px] shadow-lg rounded-2xl">
              <Link to={`/post/${post.id}`}>
                <img src={post.data.image} className="h-[45%] object-cover" />
                <div className="h-[45%] p-4 flex flex-col">
                  <p className="font-bold text-[20px] mb-2">
                    {post.data.title}
                  </p>
                  <p className="">
                    {post.data.content < 100
                      ? post.data.content
                      : `${post.data.content.slice(0, 100)} ...`}
                  </p>
                  <p className="mt-auto text-[14px] text-gray-400">
                    {Date(post.data.createdAt)}
                  </p>
                </div>
                <p className="h-[10%] p-4 leading-3">by. {post.data.author}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
