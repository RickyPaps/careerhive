"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import generateSASToken, { containerName } from "@/lib/generateSASToken";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { BlobServiceClient } from "@azure/storage-blob";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export const createPostAction = async (formData: FormData) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  let image_url: string;

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
      console.log("Uploading image to Azure Blob Storage...", image);

      const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;

      const sasToken = await generateSASToken();

      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`,
      );

      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      const timeStamp = new Date().getTime();
      const fileName = `${randomUUID()}_${timeStamp}.png`;

      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      const imageBuffer = await image.arrayBuffer();

      const res = await blockBlobClient.uploadData(imageBuffer);

      image_url = res._response.request.url;
      console.log("file uploaded to Azure Blob Storage", image_url);

      // Create post in database with image

      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl: image_url,
      };

      console.log("body", body);

      // upload image
      await Post.create(body);
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

  revalidatePath("/");
};
