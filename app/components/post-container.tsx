import { useState } from "react";
import PostList from "./post-list";

function PostContainer({ username }: { username: string }) {
  const [cnt, setCnt] = useState("1");
  const pages = [];

  for (let i = 0; i < cnt; i++) {
    pages.push(<PostList index={i} username={username} key={i} />);
  }

  const handleLoadMore = () => {
    setCnt((prevCnt) => prevCnt + 1);
  };

  return (
    <div className="my-5">
      {pages}
      <div className="flex flex-row justify-center">
        <button
          onClick={() => handleLoadMore}
          className="my-5 dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
export default PostContainer;