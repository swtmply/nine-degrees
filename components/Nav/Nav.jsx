import { HomeIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Search from "../Search/Search";

export default function Nav() {
  const [searchState, setSearchState] = useState(false);
  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <div
      className={`${
        searchState ? "z-[60]" : "z-50"
      } col-span-full bg-black h-20 sticky top-0 text-white flex items-center justify-between px-8`}
    >
      {y >= 500 ? (
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/assets/logos/iconmark-white.svg"
            width={42}
            height={42}
          />
        </Link>
      ) : (
        <Link href="/">
          <HomeIcon className="w-8 h-8 hover:text-yellow-300 cursor-pointer" />
        </Link>
      )}

      {searchState ? (
        <Search />
      ) : (
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/assets/logos/wordmark-white.svg"
            width={100}
            height={80}
          />
        </Link>
      )}

      <button onClick={() => setSearchState(!searchState)}>
        {searchState ? (
          <XIcon className="w-8 h-8 hover:text-yellow-300 cursor-pointer" />
        ) : (
          <SearchIcon className="w-8 h-8 hover:text-yellow-300 cursor-pointer" />
        )}
      </button>
    </div>
  );
}
