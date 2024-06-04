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

    const likes = post.likes;
    return NextResponse.json({ likes });
  } catch (error) {
    return NextResponse.json(
      { error: "Error when fetching post" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } },
) {
  auth().protect();

  try {
    await connectDB();

    const user = await currentUser();

    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await post.likePost(user?.id);
    return NextResponse.json({ message: "Post liked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error when liking post" },
      { status: 500 },
    );
  }
}
