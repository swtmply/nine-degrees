import NineDegreesArticle from "@/components/Articles/NineDegrees/NineDegreesArticle";
import Footer from "@/components/Footer/Footer";
import CategoryHeader from "@/components/Headers/CategoryHeader";
import NavMenu from "@/components/Nav/Menu/NavMenu";
import Nav from "@/components/Nav/Nav";
import React from "react";

export default function NineDegreesPage() {
  return (
    <div className="grid grid-cols-12 auto-rows-min gap-0 w-full min-h-screen">
      <Nav />

      <CategoryHeader category="nine-degrees" />

      <NavMenu />

      {[...Array(9)].map((_, idx) => (
        <NineDegreesArticle />
      ))}

      <Footer />
    </div>
  );
}
