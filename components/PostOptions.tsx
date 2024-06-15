"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat, Send, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PostOptions = ({ post }: { post: IPostDocument }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    return () => {
      if (user?.id && post.likes?.includes(user?.id)) {
        setLiked(true);
      }
    };
  }, [post, user]);

  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="cursor-pointer text-xs text-gray-500 hover:underline">
          {likes && likes.length > 0 && <p>{likes.length} likes</p>}
        </div>

        <div
          className="cursor-pointer text-xs text-gray-500 hover:underline"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        >
          {post?.comments && post.comments.length > 0 && (
            <p>{post.comments.length} comments</p>
          )}
        </div>
      </div>
      <div className="flex justify-between border-t p-2 px-2">
        <Button variant={"ghost"} className="postButton">
          <ThumbsUpIcon
            className={cn("mr-1", liked && "fill-[#4881c2] text-[#4881c2]")}
          />
          Like
        </Button>

        <Button
          variant={"ghost"}
          className="postButton"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        >
          <MessageCircle
            className={cn(
              "mr-1",
              isCommentsOpen && "fill-gray-600 text-gray-600",
            )}
          />
        </Button>

        <Button variant={"ghost"} className="postButton">
          <Repeat className="mr-1" />
        </Button>

        <Button variant={"ghost"} className="postButton">
          <Send className="mr-1" />
        </Button>
      </div>

      {isCommentsOpen && (
        <div className="p-4">
          {/* {user?.id && <CommentForm postId={postId} />}
          <CommentFeed post={post} /> */}
        </div>
      )}
    </div>
  );
};

export default PostOptions;
