import Image from "next/image";
import React from "react";
import AdminNavMenu from "./Menu/AdminNavMenu";

export default function AdminNav() {
  return (
    <div className="flex flex-col py-4 px-16 max-w-[300px] items-center">
      <div className="flex flex-col mb-32">
        <Image
          src="/assets/logos/iconmark-white.svg"
          width={250}
          height={250}
        />
        <Image src="/assets/logos/wordmark-white.svg" width={50} height={50} />
      </div>
      {/* Nav Menu */}
      <AdminNavMenu />
    </div>
  );
}
