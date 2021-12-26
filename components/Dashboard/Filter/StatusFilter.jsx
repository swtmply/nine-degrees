import { Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/outline";
import React from "react";

const selection = ["All", "Draft", "Pending", "Published", "Trash"];

export default function StatusFilter({ filter, setFilter }) {
  return (
    <Listbox
      as="div"
      className="relative rounded-md py-2 px-4 w-64 border border-gray-200 bg-white"
      value={filter}
      onChange={setFilter}
    >
      <Listbox.Button className="flex justify-between w-full text-lg">
        <span>{filter}</span>
        <SelectorIcon className="w-6 h-6" />
      </Listbox.Button>
      <Listbox.Options className="absolute border border-gray-200 bg-white shadow-md w-full p-2 rounded-md left-0 mt-4">
        {selection.map((item, idx) => (
          <Listbox.Option
            className="py-2 cursor-pointer hover:bg-yellow-100 px-2 rounded-md"
            key={idx}
            value={item}
          >
            {item}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
