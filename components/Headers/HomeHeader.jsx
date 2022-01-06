import Image from "next/image";
import React from "react";
import CoverStorySwiper from "../Swipers/CoverStorySwiper";

export default function HomeHeader() {
  return (
    <div className="col-span-full min-h-[470px] max-h-[470px] w-full bg-padeepBlue hidden sm:flex justify-between">
      <div className="w-[25%] h-full relative">
        <Image
          src="/assets/logos/iconmark-white.svg"
          layout="fill"
          objectFit="cover"
          alt="9degree Iconmark"
          className="scale-[1.7] -translate-x-24"
        />
      </div>
      <CoverStorySwiper />
    </div>
  );
}
