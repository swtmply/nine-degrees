import Footer from "@/components/Footer/Footer";
import CategoryHeader from "@/components/Headers/CategoryHeader";
import NavMenu from "@/components/Nav/Menu/NavMenu";
import Nav from "@/components/Nav/Nav";
import React from "react";

export default function WeArePage() {
  return (
    <div className="grid grid-cols-12 auto-rows-min gap-0 w-full min-h-screen">
      <Nav />

      <CategoryHeader category="nine-degrees" />

      <NavMenu />

      <div className="col-span-full min-h-[420px] relative mb-32">
        <div className="col-span-full grid grid-cols-8 my-16">
          <div className="col-span-6 col-start-2 h-[4.5rem]">
            <h1 className="font-black text-5xl">We Are 9°</h1>
            <p className="font-bold text-xl mt-16 mb-8">
              This is about youth. This is about you.
            </p>
            <p className="text-xl">
              9° is an interactive multi-platform magazine that unfolds the
              transformative degrees of narratives through composite
              storytelling. With vivid imageries and honest truths, we show the
              world who we really are.
              <br />
              <br />
              Stay connected with us through our social media accounts or you
              can email us at pup.icommunicate21@gmail.com
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
