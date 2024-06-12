"use server";

import { Post } from "@/mongodb/models/post";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deletePostAction = async (id: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user.userID !== user.id) {
    throw new Error("Unauthorized");
  }

  try {
    await post.removePost();
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to delete post");
  }
};
