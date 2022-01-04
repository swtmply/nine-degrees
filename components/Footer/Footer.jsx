import Image from "next/image";
import React from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { categoryList } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="col-span-full min-h-[750px] md:max-h-[750px] bg-slate-200 relative bg-[url('/assets/Footer.png')] bg-[length:100vw_100%] bg-center bg-no-repeat flex flex-col py-4 justify-center items-center">
      <Image src="/assets/logos/full-white.svg" width={200} height={250} />
      <div className="text-white space-y-2 mt-4">
        <p className=" uppercase font-bold">follow our socials:</p>
        <div className="flex space-x-2">
          <XCircleIcon className="w-12 h-12" />
          <XCircleIcon className="w-12 h-12" />
          <XCircleIcon className="w-12 h-12" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-[80%] justify-between text-white mt-10">
        {categoryList.map((category, idx) => (
          <div key={idx} className="mb-8">
            <Link href={`/categories/${category.value}`}>
              <p className="font-bold uppercase cursor-pointer mb-12">
                {category.name}
              </p>
            </Link>
            <div>
              {category?.subsection?.map((subsection, idx) => (
                <div key={idx}>
                  <Link
                    href={`/categories/${category.value}/${subsection.value}`}
                  >
                    <p className="cursor-pointer">{subsection.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
