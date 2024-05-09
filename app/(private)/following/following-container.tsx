import { useState } from "react";
import FollowingList from "./following-list";

function FollowingContainer() {
  const [cnt, setCnt] = useState(1);

  const page = [];
  for (let i = 0; i < cnt; i++) {
    page.push(<FollowingList index={i} />);
  }
  return (
    <div>
      <div className="flex justify-center w-full">
        <button
          className="bg-slate-900 p-2 my-3"
          onClick={() => setCnt(cnt + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
export default FollowingContainer;
