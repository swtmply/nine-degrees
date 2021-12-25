import HorizontalAd from "@/components/Ads/HorizontalAd";
import VerticalAd from "@/components/Ads/VerticalAd";
import ClientLayout from "@/components/Layouts/ClientLayout";
import PaginatedArticles from "@/components/PaginatedArticles/PaginatedArticles";
import { useRouter } from "next/router";
import React from "react";

export default function CategoryPage() {
  const router = useRouter();

  return (
    <ClientLayout>
      <main className="col-span-full grid grid-cols-12">
        <HorizontalAd />

        <div className="col-span-full grid grid-cols-8 my-16">
          <div className="col-span-5 col-start-2 ">
            <PaginatedArticles items={[...Array(15)]} type="stack" />
          </div>
          <VerticalAd />
        </div>
      </main>
    </ClientLayout>
  );
}
