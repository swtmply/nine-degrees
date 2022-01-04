import React from "react";

export default function SpreadLoading() {
  return (
    <div className="hidden md:block lg:w-[80%] w-full space-y-4 mb-10">
      <div className="lg:flex lg:flex-row flex flex-col items-center lg:items-end lg:space-x-4">
        <div className="w-[450px] aspect-[1.43/1] bg-gray-300 animate-pulse"></div>

        <div className="lg:w-[60%] w-full lg:justify-start lg:items-start flex flex-col mt-5 space-y-4 justify-center items-center">
          <div className="w-[30%] h-6 bg-gray-400 animate-pulse"></div>
          <div className="space-y-2 lg:block lg:items-start w-full flex flex-col items-center">
            <div className="w-[60%] h-8 bg-gray-400 animate-pulse "></div>
            <div className="w-[30%] h-2 bg-gray-400 animate-pulse "></div>
          </div>
          <div className="grid grid-cols-4 gap-2 w-full">
            <div className="h-4 bg-gray-400 animate-pulse  col-span-3"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-end space-x-4">
        <div className="w-[450px] aspect-[1.43/1] bg-gray-300 animate-pulse"></div>

        <div className="w-[60%] flex flex-col space-y-4">
          <div className="w-[30%] h-6 bg-gray-400 animate-pulse "></div>
          <div className="space-y-2">
            <div className="w-[60%] h-8 bg-gray-400 animate-pulse "></div>
            <div className="w-[30%] h-2 bg-gray-400 animate-pulse "></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-4 bg-gray-400 animate-pulse  col-span-3"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-end space-x-4">
        <div className="w-[450px] aspect-[1.43/1] bg-gray-300 animate-pulse"></div>

        <div className="w-[60%] flex flex-col space-y-4">
          <div className="w-[30%] h-6 bg-gray-400 animate-pulse "></div>
          <div className="space-y-2">
            <div className="w-[60%] h-8 bg-gray-400 animate-pulse "></div>
            <div className="w-[30%] h-2 bg-gray-400 animate-pulse "></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-4 bg-gray-400 animate-pulse  col-span-3"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
