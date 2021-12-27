import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import React from "react";

export default function SelectInput({ selectItems, selected, setSelected }) {
  return (
    <div className="flex flex-col font-helvetica space-y-4  py-4 rounded-lg">
      <h2 className="font-bold text-2xl text-black">Select List</h2>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="text-black w-full font-bold p-4 bg-white flex justify-between rounded-lg">
            <span className="block truncate">{selected.name}</span>
            <span>
              <SelectorIcon className="w-6 h-6" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full mt-1 overflow-auto text-base bg-slate-200 rounded-lg shadow-lg max-h-60">
              {selectItems.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active, selected }) =>
                    `${
                      active || selected
                        ? "bg-blue-600 text-slate-100"
                        : "bg-white text-black"
                    } flex items-center space-x-2 py-2 px-4 cursor-default select-none relative `
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      {selected ? (
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      ) : null}

                      <span className={`${!selected ? "pl-7" : "font-bold"}`}>
                        {option.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
