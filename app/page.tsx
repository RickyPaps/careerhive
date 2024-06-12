import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import connectDB from "@/mongodb/db";
import { IPostDocument, Post } from "@/mongodb/models/post";
import { SignedIn } from "@clerk/nextjs";

export const revalidate = 0; // Makes sure it is server side rendered

export default async function Home() {
  await connectDB();

  // Fetch all posts from the database
  // The 'await' keyword is used to wait for the promise to resolve
  // before continuing with the rest of the function
  const posts = await Post.getAllPosts();
  return (
    <div className="mt-5 grid grid-cols-8 sm:px-5">
      <section className="hidden md:col-span-2 md:inline">
        <UserInformation />
      </section>
      <section className="col-span-full mx-auto w-full md:col-span-6 xl:col-span-4 xl:max-w-xl">
        {/* Post form */}
        <SignedIn>
          <PostForm />
        </SignedIn>
        {/* Post Feed */}
        <PostFeed posts={posts} />
      </section>
      <section className="col-span-2 hidden justify-center xl:inline">
        {/* Widget */}
      </section>
    </div>
  );
}
