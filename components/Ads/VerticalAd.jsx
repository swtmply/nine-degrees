import { XCircleIcon } from "@heroicons/react/solid";
import React from "react";

export default function VerticalAd() {
  return (
    <div className="col-span-1 col-start-7 row-start-1 flex flex-col sticky -top-10 h-[1200px]">
      <div className="space-y-2 my-8">
        <p className=" uppercase font-bold">follow our socials:</p>
        <div className="flex space-x-2">
          <XCircleIcon className="w-12 h-12" />
          <XCircleIcon className="w-12 h-12" />
          <XCircleIcon className="w-12 h-12" />
        </div>
      </div>
      <div className="w-[200px] h-[400px] bg-yellowwallow mb-4"></div>
      <div className="w-[200px] h-[600px] bg-yellowwallow"></div>
    </div>
  );
}
