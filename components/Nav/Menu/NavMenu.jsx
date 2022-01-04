import Search from "@/components/Search/Search";
import { categoryList } from "@/lib/constants";
import { ChevronRightIcon, XIcon } from "@heroicons/react/solid";
import { useInView } from "react-intersection-observer";
import MenuDropdown from "./Dropdown/MenuDropdown";
import { MobileMenuDropdown } from "./Dropdown/MenuDropdown";

export default function NavMenu() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    rootMargin: "-100px",
    threshold: 0,
  });

  return (
    <div
      ref={ref}
      className="col-span-full hidden md:grid grid-cols-8 my-16 sticky top-1 z-50 pointer-events-none"
    >
      <div
        className={`${
          !inView ? "bg-black text-white" : "bg-yellowwallow"
        } pointer-events-auto col-span-6 col-start-2 h-[4.5rem] rounded-lg self-center group hover:bg-black transition-colors duration-200 flex px-32 items-center justify-between`}
      >
        {categoryList.map((category, idx) => (
          <MenuDropdown
            key={idx}
            title={category}
            items={category.subsection}
          />
        ))}
      </div>
    </div>
  );
}

export function MobileMenu({ isOpen, setIsOpen }) {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "translate-x-full"
      } fixed inset-0 bg-black ease-in-out transition-all z-50 p-4`}
    >
      <button onClick={() => setIsOpen(!isOpen)}>
        <XIcon className="w-8 h-8 cursor-pointer hover:text-yellowwallow" />
      </button>
      <Search />

      {categoryList.map((category, idx) => (
        <MobileMenuDropdown
          key={idx}
          title={category}
          items={category.subsection}
        />
      ))}
    </div>
  );
}
