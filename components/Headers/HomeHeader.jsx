import React from "react";
import CoverStorySwiper from "../Swipers/CoverStorySwiper";

export default function HomeHeader() {
  return (
    <div className="col-span-full min-h-[470px] max-h-[470px] w-full bg-slate-200 relative bg-[url('/assets/Hero.png')] bg-[length:100vw_100%] bg-center bg-no-repeat flex justify-end">
      <CoverStorySwiper />
    </div>
  );
}
