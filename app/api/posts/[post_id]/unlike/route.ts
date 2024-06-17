import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface unlikePostRequestBody {
  userId: string;
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

    user?.id && (await post?.unlikePost(user?.id));
    return NextResponse.json({ message: "Post unliked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error when unliking post" },
      { status: 500 },
    );
  }
}
