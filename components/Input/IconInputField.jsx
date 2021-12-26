import { isEmpty } from "@/utils/index";
import React from "react";

export default function IconInputField({
  name,
  type,
  value,
  placeholder,
  onChange,
  formValues = {},
  icon: Icon,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (isEmpty(formValues)) {
      onChange(value);
    } else {
      onChange({ ...formValues, [name]: value });
    }
  };

  return (
    <label
      htmlFor={name}
      className="flex items-center text-xl bg-white border border-gray-200 p-2 rounded text-gray-600 divide-x space-x-2 focus-within:text-black focus-within:border-black focus-within:divide-black"
    >
      <Icon className="w-6 h-6" />
      <input
        id={name}
        type={type}
        name={name}
        onChange={handleChange}
        value={isEmpty(formValues) ? value : formValues[name]}
        placeholder={placeholder}
        className="outline-none bg-transparent px-2 w-full"
      />
    </label>
  );
}
