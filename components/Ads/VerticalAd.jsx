import { XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VerticalAd() {
  return (
    <div className="col-span-1 col-start-7 row-start-1 hidden md:flex flex-col sticky -top-10 h-[1200px]">
      <div className="space-y-2 my-8">
        <p className=" uppercase font-bold">follow our socials:</p>
        <div className="flex space-x-2">
          <Link href="https://www.facebook.com/9degreesph">
            <a target="_blank">
              <Image
                src="/assets/icons/facebook icon.png"
                width={56}
                height={56}
                className="cursor-pointer"
              />
            </a>
          </Link>
          <Link href="https://twitter.com/9degreesph">
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
      <div className="w-[200px] h-[400px] bg-yellowwallow mb-4 relative">
        <Link href="https://twitter.com/9degreesph">
          <a target="_blank">
            <Image
              src="/assets/ads/Mini Skycraper Ad.jpg"
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
            />
          </a>
        </Link>
      </div>
      <div className="w-[200px] h-[600px] bg-yellowwallow relative">
        <Link href="https://www.instagram.com/9degreesph">
          <a target="_blank">
            <Image
              src="/assets/ads/Skycraper Ad.jpg"
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
