import React from "react";

export default function Checkbox({
  selectedCategories,
  setSelectedCategories,
  items,
}) {
  const handleCheckBox = (e) => {
    if (!selectedCategories.some((c) => c === e.target.value)) {
      setSelectedCategories((prev) => [...prev, e.target.value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== e.target.value)
      );
    }
  };

  return (
    <div className="space-y-2">
      <p className="font-bold text-xl my-4">Category</p>
      {items.map((item, i) => (
        <div key={i}>
          <label className="inline-flex items-center space-x-4">
            <input
              className="w-6 h-6 mr-4 border-2 text-yellowwallow focus:ring-opacity-50 focus:ring-yellowwallow border-gray-400 rounded-full"
              type="checkbox"
              id={`c-${i}`}
              value={item.name}
              name={item.name}
              onChange={handleCheckBox}
              checked={selectedCategories.find((t) => t === item.name)}
            />
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
}
