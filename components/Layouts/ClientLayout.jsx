import React, { useEffect } from "react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import HomeHeader from "../Headers/HomeHeader";
import NavMenu from "../Nav/Menu/NavMenu";
import HorizontalAd from "../Ads/HorizontalAd";
import CategoryHeader from "../Headers/CategoryHeader";
import Image from "next/image";

export default function ClientLayout({ children, category, writer = false }) {
  return (
    <div className="grid grid-cols-12 auto-rows-min gap-0 w-full min-h-screen">
      <Nav />

      {/* check if home or not then change headers */}
      {category ? (
        <CategoryHeader category={category} />
      ) : writer ? (
        <div className="col-span-full min-h-[300px] max-h-[300px] w-full bg-slate-200 relative flex justify-end">
          <Image
            src={`/assets/banners/writer.png`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <HomeHeader />
      )}

      <NavMenu />

      {children}

      <HorizontalAd />

      <Footer />
    </div>
  );
}
