import { CheckIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import React from "react";

export default function RadioGroupInput({
  category,
  selectedSubsection,
  setselectedSubsection,
}) {
  return (
    <div className="bg-white w-full rounded-md p-2">
      <RadioGroup value={selectedSubsection} onChange={setselectedSubsection}>
        <div className="px-2 space-y-4">
          {category?.subsection &&
            category?.subsection.map((sub) => (
              <RadioGroup.Option key={sub.value} value={sub.value}>
                {({ checked }) => (
                  <div className="flex items-center space-x-4">
                    <div
                      className={`${
                        checked ? "bg-blue-600" : "ring-black"
                      } ring rounded-full w-6 h-6 flex justify-center items-center`}
                    >
                      {checked && <CheckIcon className="w-5 h-5 text-white" />}
                    </div>
                    <span className="font-semibold text-lg">{sub.name}</span>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
        </div>
      </RadioGroup>
    </div>
  );
}
