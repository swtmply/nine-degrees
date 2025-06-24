import { HomeIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import {
  ChevronRightIcon,
  MenuIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Search from "../Search/Search";
import { MobileMenu } from "./Menu/NavMenu";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Nav() {
  const [searchState, setSearchState] = useState(false);
  const [y, setY] = useState(null);

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

  const { width } = useMediaQuery();

  if (width < 600) return <MobileNav />;

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
          <HomeIcon className="w-8 h-8 hover:text-yellowwallow cursor-pointer" />
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
          <XIcon className="w-8 h-8 hover:text-yellowwallow cursor-pointer" />
        ) : (
          <SearchIcon className="w-8 h-8 hover:text-yellowwallow cursor-pointer" />
        )}
      </button>
    </div>
  );
}

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  return (
    <div className="flex justify-between items-center col-span-full bg-black px-4 py-2 sticky top-0 z-10 text-white">
      <Link href="/">
        <Image
          src={"/assets/logos/iconmark-white.svg"}
          alt="Nine Degree Icon Mark"
          height={64}
          width={64}
        />
      </Link>

      <button onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon className="w-8 h-8 cursor-pointer hover:text-yellowwallow" />
      </button>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
