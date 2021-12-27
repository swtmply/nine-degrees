import React from "react";
import { TagsInput } from "react-tag-input-component";

export default function TagsInputField({ name, value, onChange, label }) {
  return (
    <div className="w-full flex flex-col my-4 shadow-md">
      <label htmlFor={name} className="text-2xl font-bold mb-2">
        {label}
      </label>
      <TagsInput
        value={value}
        onChange={onChange}
        name={name}
        placeHolder="Enter tag (Press enter to add another)"
      />
    </div>
  );
}
