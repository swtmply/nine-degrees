import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

export default function MenuDropdown({ title, items }) {
  const menuRef = useRef(null);
  const [openState, setOpenState] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const router = useRouter();

  const onHover = (open, action) => {
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      setOpenState(!openState);

      menuRef?.current?.click();
    }
  };

  const onFocus = () => setMenuState(!menuState);

  return (
    <Menu
      as="div"
      className="relative"
      onClick={() => {
        if (openState && !menuState) {
          setOpenState(!openState);

          if (title.value.includes("nine-degrees"))
            router.push(`/${title.value}`);

          router.push(`/categories/${title.value}`);
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
            onMouseEnter={() => {
              onHover(open, "onMouseEnter");
            }}
            onMouseLeave={() => {
              onHover(open, "onMouseLeave");
            }}
          >
            {title.name}
          </Menu.Button>

          <Menu.Items
            static={menuState}
            className="absolute w-[170px] p-2 -left-2 outline-none"
            onMouseEnter={onFocus}
            onMouseLeave={onFocus}
          >
            <div
              className={`${
                title.value === "so-lit" && "hidden"
              } bg-yellow-300 px-4 py-8 rounded-md`}
            >
              {items?.map((subsection, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {idx === 0 ? (
                      <></>
                    ) : (
                      <hr className="border-2 border-black my-4" />
                    )}

                    <Menu.Item>
                      <Link
                        href={`${
                          title.value.includes("nine-degrees")
                            ? `/${title.value}/${subsection.value}`
                            : `/categories/${title.value}/${subsection.value}`
                        }`}
                      >
                        <div className="text-black cursor-pointer">
                          {subsection.name}
                        </div>
                      </Link>
                    </Menu.Item>
                  </React.Fragment>
                );
              })}
            </div>
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
}
