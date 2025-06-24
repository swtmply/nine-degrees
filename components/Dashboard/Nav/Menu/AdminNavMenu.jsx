import { Menu } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EICMenu = [
  { name: "Articles", value: "/admin" },
  { name: "Users", value: "/admin/users" },
  { name: "Trash", value: "/admin/trash" },
];
const HeadMenu = [
  { name: "Articles", value: "/admin" },
  { name: "Manage Team", value: "/admin/manage-team" },
  { name: "Trash", value: "/admin/trash" },
];
const WriterMenu = [
  { name: "Articles", value: "/admin" },
  { name: "Trash", value: "/admin/trash" },
];

export default function AdminNavMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (session?.user.role.toLowerCase() === "eic") {
      setMenu(EICMenu);
    } else if (session?.user.role.toLowerCase() === "head") {
      setMenu(HeadMenu);
    } else {
      setMenu(WriterMenu);
    }
  }, [session]);

  return (
    <Menu as="div" className="text-white text-lg">
      <Menu.Button></Menu.Button>
      <Menu.Items static={true} className="flex flex-col space-y-3">
        {menu.map((m, idx) => (
          <Menu.Item key={idx}>
            {({ active }) => (
              <Link href={m.value} className={`${
                    router.pathname === m.value ? "font-bold" : "font-normal"
                  }`}>
                {m.name}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
