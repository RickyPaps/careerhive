import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";

export default function Home() {
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
