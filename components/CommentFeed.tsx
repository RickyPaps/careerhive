"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ReactTimeago from "react-timeago";

const CommentFeed = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();

  const isAuthor = user?.id === post.user?.userID;

  return (
    <div className="space-y-2 mt-3">
      {post.comments?.map((comment) => (
        <div key={comment._id as string} className="flex space-x-1">
          <Avatar>
            <AvatarImage src={comment.user.userImage} />
            <AvatarFallback>
              {comment.user.firstName?.charAt(0)}
              {comment.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="md:min-w-[300px]: w-full rounded-md bg-gray-100 px-4 py-2 sm:w-auto">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {comment.user.firstName} {comment.user.lastName}
                </p>
                <p className="tetx-xs text-gray-400">
                  @{comment.user.firstName}
                  {comment.user.lastName}-{comment.user.userID.slice(-4)}
                </p>
              </div>
              <p className="text-xs text-gray-400">
                <ReactTimeago date={new Date(comment.createdAt)} />
              </p>
            </div>
            <p className="mt-3 text-sm">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;
