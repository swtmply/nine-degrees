import React from "react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import HomeHeader from "../Headers/HomeHeader";
import NavMenu from "../Nav/Menu/NavMenu";
import HorizontalAd from "../Ads/HorizontalAd";

export default function ClientLayout({ children }) {
  return (
    <div className="grid grid-cols-12 auto-rows-min gap-0 w-full min-h-screen">
      <Nav />

      {/* TODO: check if home or not then change headers */}
      <HomeHeader />

      <NavMenu />

      {children}

      <HorizontalAd />

      <Footer />
    </div>
  );
}
