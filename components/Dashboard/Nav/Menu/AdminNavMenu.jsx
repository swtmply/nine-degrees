import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function AdminNavMenu() {
  const { data: session } = useSession();

  return (
    <div className="text-[#e6e6e6] text-xl space-y-3 font-medium">
      <Link href="/admin/">
        <a className="block">Dashboard</a>
      </Link>
      <Link href={`/writer/profile`}>
        <a className="block">Profile</a>
      </Link>
      <Link href={`/writer/settings`}>
        <a className="block">Settings</a>
      </Link>
      <button>Logout</button>
    </div>
  );
}
