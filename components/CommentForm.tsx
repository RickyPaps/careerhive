"use client";

import { useUser } from "@clerk/nextjs";

const CommentForm = ({ postId }: { postId: string }) => {
  const user = useUser();

  return <form>CommentForm</form>;
};

export default CommentForm;
