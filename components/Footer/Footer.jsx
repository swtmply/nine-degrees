import Image from "next/image";
import React from "react";
import { categoryList } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="col-span-full min-h-[750px] md:max-h-[750px] bg-black relative sm:bg-[url('/assets/Footer.png')] bg-[length:100vw_100%] bg-center bg-no-repeat flex flex-col py-4 justify-center items-center">
      <Image src="/assets/logos/full-white.svg" width={200} height={250} />
      <div className="text-white space-y-2 mt-4 text-center">
        <p className=" uppercase font-bold">follow our socials:</p>
        <div className="flex gap-4">
          <Link href="https://www.facebook.com/atbp.2n">
            <a target="_blank">
              <Image
                src="/assets/icons/facebook icon.png"
                width={56}
                height={56}
                className="cursor-pointer"
              />
            </a>
          </Link>
          <Link href="https://twitter.com/atbp2n">
            <a target="_blank">
              <Image
                src="/assets/icons/twitter icon.png"
                width={56}
                height={56}
                className="cursor-pointer"
              />
            </a>
          </Link>
          <Link href="https://www.instagram.com/9degreesph/">
            <a target="_blank">
              <Image
                src="/assets/icons/ig icon.png"
                width={56}
                height={56}
                className="cursor-pointer"
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-[80%] justify-between text-white mt-10">
        {categoryList.map((category, idx) => (
          <div key={idx} className="mb-8">
            <Link
              href={`${
                category.value.includes("nine-degrees")
                  ? `/${category.value}`
                  : `/categories/${category.value}`
              }`}
            >
              <p className="font-bold uppercase cursor-pointer mb-12">
                {category.name}
              </p>
            </Link>
            <div>
              {category?.subsection?.map((subsection, idx) => (
                <div key={idx}>
                  <Link
                    href={`${
                      category.value.includes("nine-degrees")
                        ? `/${category.value}/${subsection.value}`
                        : `/categories/${category.value}/${subsection.value}`
                    }`}
                  >
                    <div className="text-white cursor-pointer">
                      {subsection.name}
                    </div>
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
