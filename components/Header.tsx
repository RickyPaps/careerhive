import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex">
      <Image
        className="rounded-lg"
        src="/logo.png"
        alt="logo"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Header;
