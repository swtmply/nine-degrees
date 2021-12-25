import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

export default function MenuDropdown({ title, items }) {
  const menuRef = useRef(null);
  const [openState, setOpenState] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const router = useRouter();

  const onHover = (open) => {
    if ((!open && !openState) || (open && openState)) setOpenState(!openState);

    menuRef?.current?.click();
  };

  const onFocus = () => setMenuState(!menuState);

  return (
    <Menu
      as="a"
      className="relative"
      onClick={() => {
        if (openState && !menuState) {
          setOpenState(!openState);
          router.push(`/${title.value}`);
        }
      }}
    >
      {({ open }) => (
        <div className="group-hover:text-white font-bold">
          <Menu.Button
            ref={menuRef}
            className={`${
              open && "text-yellow-300"
            } uppercase font-bold outline-none cursor-pointer`}
            onMouseEnter={() => onHover(open)}
            onMouseLeave={() => onHover(open)}
          >
            {title.name}
          </Menu.Button>

          <Menu.Items
            static={menuState}
            className="absolute w-[170px] p-2 -left-2 outline-none"
            onMouseEnter={onFocus}
            onMouseLeave={onFocus}
          >
            <div className="bg-yellow-300 px-4 py-8 rounded-md">
              {items?.map((subsection, idx) => (
                <React.Fragment key={idx}>
                  {idx === 0 ? (
                    <></>
                  ) : (
                    <hr className="border-2 border-black my-4" />
                  )}

                  <Menu.Item>
                    <Link href={`/${title.value}/${subsection.value}`}>
                      <div className="text-black cursor-pointer">
                        {subsection.name}
                      </div>
                    </Link>
                  </Menu.Item>
                </React.Fragment>
              ))}
            </div>
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
}
