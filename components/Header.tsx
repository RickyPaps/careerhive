import {
  Briefcase,
  HomeIcon,
  MessageSquare,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto text-white">
      <Image
        className="rounded-lg"
        src="/Logo-1.png"
        alt="logo"
        width={100}
        height={100}
      />
      <div className="flex-1">
        <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none text-black group"
          />
        </form>
      </div>

      <div className="flex items-center space-x-4 px-6">
        <Link href="/" className="icon hover:text-[#FFA500]">
          <HomeIcon className="h-5" />
          <p>Home</p>
        </Link>
        <Link href="/" className="icon hidden md:flex hover:text-[#FFA500]">
          <UserIcon className="h-5" />
          <p>Network</p>
        </Link>
        <Link href="/" className="icon hidden md:flex hover:text-[#FFA500]">
          <Briefcase className="h-5" />
          <p>Jobs</p>
        </Link>
        <Link href="/" className="icon hover:text-[#FFA500]">
          <MessageSquare className="h-5" />
          <p>Messaging</p>
        </Link>

        {/* User button if signed in*/}
        {/* Sign in button if not signed in*/}
      </div>
    </div>
  );
};

export default Header;
