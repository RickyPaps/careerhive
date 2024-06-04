"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
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

  const userDB: IUser = {
    userID: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  try {
    // upload image
    if (image.size > 0) {
      // upload image
      // create post in db wth image
    } else {
      // create post in db without image

      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
      };

      await Post.create(body);
    }
  } catch (error) {
    throw new Error("Failed to create post");
  }

  // create post in db

  // revalidate path
};
