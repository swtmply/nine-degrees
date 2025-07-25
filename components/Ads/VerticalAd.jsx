import { XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VerticalAd({ category }) {
  const cat = category?.toLowerCase();

  return (
    <div className="col-span-1 col-start-7 row-start-1 hidden md:flex flex-col sticky -top-10 h-[1200px]">
      <div className="space-y-2 my-8">
        <p className=" uppercase font-bold">follow our socials:</p>
        <div className="flex space-x-2">
          <Link href="https://www.facebook.com/9degreesph" target="_blank">
            <Image
              src="/assets/icons/facebook icon.png"
              width={56}
              height={56}
              className="cursor-pointer"
            />
          </Link>
          <Link href="https://twitter.com/9degreesph" target="_blank">
            <Image
              src="/assets/icons/twitter icon.png"
              width={56}
              height={56}
              className="cursor-pointer"
            />
          </Link>
          <Link href="https://www.instagram.com/9degreesph/" target="_blank">
            <Image
              src="/assets/icons/ig icon.png"
              width={56}
              height={56}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <div className="w-[200px] h-[400px] bg-yellowwallow mb-4 relative">
        <Link href="https://twitter.com/9degreesph" target="_blank">
          <Image
            src="/assets/ads/Mini Skycraper Ad.jpg"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="w-[200px] h-[600px] bg-yellowwallow relative">
        {category ? (
          <Image
            src={
              cat == "news"
                ? "/assets/ads/Kotex 200x600.png"
                : cat == "features"
                ? "/assets/ads/9Degrees Skyscraper Ad R1.jpg"
                : cat == "community"
                ? "/assets/ads/MTG_ADSPACE.jpg"
                : "/assets/ads/Nextile PH Skyscraper Ad.png"
            }
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
          />
        ) : (
          <Image
            src="/assets/ads/Kotex 200x600.png"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
