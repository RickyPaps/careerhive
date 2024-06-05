import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string } },
) {
  try {
    await connectDB();
    const post = await Post.findById(params.post_id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: "Error when fetching post" },
      { status: 500 },
    );
  }
}

export interface DeletePostRequestBody {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: { post_id: string } },
) {
  auth().protect();
  try {
    await connectDB();

    const user = await currentUser();

    // const { userId }: DeletePostRequestBody = await request.json();

    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.user.userID !== user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await post.removePost();

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error when deleting post" },
      { status: 500 },
    );
  }
}
