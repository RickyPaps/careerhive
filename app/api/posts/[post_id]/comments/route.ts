import connectDB from "@/mongodb/db";
import { ICommentBase } from "@/mongodb/models/comment";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string } },
) {
  auth().protect();

  try {
    await connectDB();

    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const comments = await post.getAllComments();
    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json(
      { error: "Error when fetching comments" },
      { status: 500 },
    );
  }
}

export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } },
) {
  auth().protect();
  const { text, user }: AddCommentRequestBody = await request.json();
  const authUser = await currentUser();

  try {
    await connectDB();

    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (user.userID !== authUser?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const comment: ICommentBase = {
      user,
      text,
    };

    await post.commentOnPost(comment);
    return NextResponse.json({ message: "Comment created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error when creating comment" },
      { status: 500 },
    );
  }
}
