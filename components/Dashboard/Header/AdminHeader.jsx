import { TrashIcon } from "@heroicons/react/solid";
import React from "react";

export default function AdminHeader({ articles }) {
  return (
    <div className="flex justify-between mt-8">
      {/* Stats */}
      <div className="flex flex-col bg-white p-4 w-[70%] h-44 mb-2 rounded-md">
        <div className=" flex justify-around relative">
          {/* TODO: change to real counts */}
          {[...Array(6)].map((_, idx) => (
            <div className="text-center">
              <p className="font-mono text-8xl">0</p>
            </div>
          ))}
        </div>
        <div className="bg-yellow-300 w-full py-3 flex justify-around rounded-md">
          {/* TODO: change to real values */}
          {[...Array(6)].map((_, idx) => (
            <div className="text-center">
              <p className="flex space-x-2">
                <TrashIcon className="w-6 h-6" />
                <span>Published</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-white p-4 w-[28%] h-44 mb-2 rounded-md">
        <div className="flex flex-col items-end">
          <p className="font-bold text-2xl mb-4">Good day, bhie!</p>
          <p className="font-bold text-lg text-right leading-5 mb-2">
            Feeling motivated to inspire Bernadette and Jonathan today?
          </p>
          {/* TODO: create link */}
          <button className="w-full py-3 bg-red-500 font-bold text-lg text-white rounded-md hover:bg-red-600">
            Create Article +
          </button>
        </div>
      </div>
    </div>
  );
}
