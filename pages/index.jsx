import HorizontalAd from "@/components/Ads/HorizontalAd";
import VerticalAd from "@/components/Ads/VerticalAd";
import ClientLayout from "@/components/Layouts/ClientLayout";
import PaginatedArticles from "@/components/PaginatedArticles/PaginatedArticles";
import ArticleSwiper from "@/components/Swipers/ArticleSwiper";

export default function Home() {
  return (
    <ClientLayout>
      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-10 col-start-2">
          <ArticleSwiper />
        </div>

        <HorizontalAd />

        <div className="col-span-full grid grid-cols-8 my-16">
          <div className="col-span-5 col-start-2">
            <h2 className="uppercase font-black text-3xl tracking-widest mb-5">
              Latest
            </h2>
            <PaginatedArticles items={[...Array(15)]} type="spread" />
          </div>
          <VerticalAd />
        </div>
      </main>
    </ClientLayout>
  );
}
