"use server";

import { currentUser } from "@clerk/nextjs/server";

export const createPostAction = async (formData: FormData) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  let imageUrl: string | undefined;

  if (!postInput) {
    throw new Error("Post cannot be empty");
  }

  //   define user

  // upload image

  // create post in db

  // revalidate path
};
