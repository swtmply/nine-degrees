import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function UserButton() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Menu as="div" className="relative col-span-full grid grid-cols-5">
      <Menu.Button className="col-span-2 col-start-6">
        <div className="flex space-x-2">
          <div className="flex flex-col items-end justify-center">
            <p className="font-bold text-lg">{session?.user.name}</p>
            <p className="text-slate-400">{session?.user.role}</p>
          </div>
          <div className="w-20 h-20 bg-slate-500 rounded-md relative">
            <Image
              src={session?.user.image || "/assets/samples/PUBMAT SAMPLE.jpg"}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      </Menu.Button>
      <Menu.Items className="absolute z-40 -bottom-36 shadow-lg bg-white space-y-2 w-full col-start-6 flex flex-col rounded-md p-2">
        <Menu.Item>
          <Link href={`/user/profile`}>
            <button className="py-1 hover:bg-yellow-300  rounded-md">
              Profile
            </button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={`/user/settings`}>
            <button className="py-1 hover:bg-yellow-300  rounded-md">
              Settings
            </button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <button
            className="py-1 hover:bg-yellow-300  rounded-md"
            onClick={async () => {
              const res = await signOut({
                redirect: false,
                callbackUrl: "/auth/login",
              });
              router.push(res.url);
            }}
          >
            Logout
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
