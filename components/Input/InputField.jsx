import { isEmpty } from "@/utils/index";
import React from "react";

export default function InputField({
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  formValues = {},
  label,
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
    <div className="w-full flex flex-col my-4 ">
      <label htmlFor={name} className="text-2xl font-bold mb-2">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        onChange={handleChange}
        value={isEmpty(formValues) ? value : formValues[name]}
        placeholder={placeholder}
        className="outline-none py-3 px-2 text-lg rounded-md shadow-md"
      />
    </div>
  );
}
