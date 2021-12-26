import React, { useEffect } from "react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import HomeHeader from "../Headers/HomeHeader";
import NavMenu from "../Nav/Menu/NavMenu";
import HorizontalAd from "../Ads/HorizontalAd";
import { useRouter } from "next/router";
import CategoryHeader from "../Headers/CategoryHeader";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const pathname = router.query.category;

  return (
    <div className="grid grid-cols-12 auto-rows-min gap-0 w-full min-h-screen">
      <Nav />

      {/* check if home or not then change headers */}
      {pathname !== undefined ? (
        <CategoryHeader category={pathname?.split("/")[0]} />
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
