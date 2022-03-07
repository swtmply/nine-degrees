import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
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

          if (title.value.includes("nine-degrees")) {
            // TODO: change if needed
            router.push(`/`);
          } else {
            router.push(`/categories/${title.value}`);
          }
        }
      }}
    >
      {({ open }) => (
        <div className="group-hover:text-white font-bold">
          <Menu.Button
            ref={menuRef}
            className={`${
              open && "text-yellowwallow"
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
              } bg-yellowwallow px-4 py-8 rounded-md`}
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

export function MobileMenuDropdown({ title, items }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`${
              open ? "text-yellowwallow" : ""
            } flex w-full justify-center space-x-2 items-center text-2xl py-4 `}
          >
            {title.value === "so-lit" ? (
              <>
                <Link href={`/categories/${title.value}`}>
                  <div className="text-white cursor-pointer">{title.name}</div>
                </Link>
              </>
            ) : (
              <>
                <span>{title.name}</span>
                <ChevronDownIcon className="w-8 h-8" />
              </>
            )}
          </Disclosure.Button>
          <Transition
            show={open}
            enter="duration-100 ease-out"
            enterFrom="-translate-y-6 opacity-0"
            enterTo="-translate-y-0 opacity-100"
            leave="duration-75 ease-out"
            leaveFrom="-translate-y-0 opacity-100"
            leaveTo="-translate-y-6 opacity-0"
          >
            <Disclosure.Panel className="flex flex-col justify-center items-center space-y-4">
              {items?.map((subsection, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {idx === 0 && (
                      <Link
                        href={`${
                          title.value.includes("nine-degrees")
                            ? `/${title.value}`
                            : `/categories/${title.value}`
                        }`}
                      >
                        <div className="text-white cursor-pointer">
                          {title.name} Section
                        </div>
                      </Link>
                    )}

                    <Link
                      href={`${
                        title.value.includes("nine-degrees")
                          ? `/${title.value}/${subsection.value}`
                          : `/categories/${title.value}/${subsection.value}`
                      }`}
                    >
                      <div className="text-white cursor-pointer">
                        {subsection.name}
                      </div>
                    </Link>
                  </React.Fragment>
                );
              })}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
