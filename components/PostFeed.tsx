import { IPostDocument } from "@/mongodb/models/post";
import React from "react";
import Post from "./Post";

const PostFeed = ({ posts }: { posts: IPostDocument[] }) => {
  console.log(posts);
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post: any) => (
        <div key={post._id}>
          <Post key={post._id} post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
