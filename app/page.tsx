import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";

export const revalidate = 0; // Makes sure it is server side rendered

export default async function Home() {
  await connectDB();

  const posts = await Post.getAllPosts();

  console.log(posts);

  return (
    <div className="mt-5 grid grid-cols-8 sm:px-5">
      <section className="hidden md:col-span-2 md:inline">
        <UserInformation />
      </section>
      <section className="col-span-full mx-auto w-full md:col-span-6 xl:col-span-4 xl:max-w-xl">
        {/* Post form */}
        <PostForm />
        {/* Post Feed */}
      </section>
      <section className="col-span-2 hidden justify-center xl:inline">
        {/* Widget */}
      </section>
    </div>
  );
}
