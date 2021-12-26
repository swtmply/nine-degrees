import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function SidebarMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <div className="text-[#e6e6e6] text-md space-y-2">
        <Link href="/admin/">
          <a className="block">Home</a>
        </Link>
        <Link href={`/writer/${session?.id}/articles`}>
          <a className="block">Articles</a>
        </Link>
        <Link href={`/writer/${session?.id}/drafts`}>
          <a className="block">Drafts</a>
        </Link>
        <Link href={`/writer/${session?.id}/trash/`}>
          <a className="block">Trash</a>
        </Link>
      </div>
    </>
  );
}
