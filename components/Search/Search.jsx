import React from "react";

export default function Search() {
  return (
    <div className="h-16 w-[500px] flex items-center justify-start relative">
      <input
        className="text-white bg-transparent placeholder:text-white outline-none text-xl font-mono px-2 py-2 w-full border-b-2 border-white focus:border-yellow-200"
        type="text"
        placeholder="Search something..."
      />
    </div>
  );
}
