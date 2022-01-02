import HorizontalAd from "@/components/Ads/HorizontalAd";
import VerticalAd from "@/components/Ads/VerticalAd";
import ClientLayout from "@/components/Layouts/ClientLayout";
import SpreadLoading from "@/components/Loaders/SpreadLoading";
import SwipeLoading from "@/components/Loaders/SwipeLoading";
import PaginatedArticles from "@/components/PaginatedArticles/PaginatedArticles";
import ArticleSwiper from "@/components/Swipers/ArticleSwiper";
import useArticles from "@/hooks/useArticles";

export default function Home() {
  const { data, isLoading } = useArticles();

  return (
    <ClientLayout>
      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-10 col-start-2">
          {isLoading ? (
            <SwipeLoading />
          ) : (
            <ArticleSwiper articles={data.articles} />
          )}
        </div>

        <HorizontalAd />

        <div className="col-span-full grid grid-cols-8 my-16 relative">
          <div className="col-span-5 col-start-2">
            <h2 className="uppercase font-black text-3xl tracking-widest mb-5">
              Latest
            </h2>
            {isLoading ? (
              <SpreadLoading />
            ) : (
              <PaginatedArticles items={data.articles} type="spread" />
            )}
          </div>
          <VerticalAd />
        </div>
      </main>
    </ClientLayout>
  );
}
