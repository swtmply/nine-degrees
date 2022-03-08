import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HorizontalAd() {
  return (
    <div className="col-span-full hidden md:grid grid-cols-8 my-16">
      <div className="col-span-4 col-start-3 h-32 bg-yellowwallow relative">
        <Link href="https://www.cebupacificair.com/">
          <a target="_blank">
            <Image
              src="/assets/ads/CebuPacificAd_Leaderboard.jpg"
              layout="fill"
              objectFit="cover"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
