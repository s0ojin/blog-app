import { Link } from "react-router-dom";
import { timeConverter } from "../utils/timeConverter";

export default function PostCard({ postData }) {
  return (
    <Link to={`/post/${postData.id}`}>
      <li className="flex flex-col shadow-lg rounded-2xl min-h-[380px]">
        <img src={postData.data.image} className="h-[45%] object-cover" />
        <div className="h-[45%] p-4 flex flex-col grow">
          <p className="font-bold text-[18px] mb-2">{postData.data.title}</p>
          <p className="grow text-[14px]">
            {postData.data.content < 60
              ? postData.data.content
              : `${postData.data.content.slice(0, 60)} ...`}
          </p>
          <p className="mt-auto text-[12px] text-gray-400">
            {timeConverter(postData.data.createdAt)}
          </p>
        </div>
        <p className="h-[10%] p-4 leading-3 text-[14px]">
          by. {postData.data.author}
        </p>
      </li>
    </Link>
  );
}
