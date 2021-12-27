import React from "react";

export default function CheckboxInput({ values, setValue }) {
  return (
    <div className="bg-white h-16">
      <label>
        <input type="checkbox" class="accent-blue-600" checked />
        {values}
      </label>
    </div>
  );
}
