import HorizontalAd from "@/components/Ads/HorizontalAd";
import VerticalAd from "@/components/Ads/VerticalAd";
import ClientLayout from "@/components/Layouts/ClientLayout";
import PaginatedArticles from "@/components/PaginatedArticles/PaginatedArticles";
import Articles from "@/models/Articles";
import React from "react";
import mongoDBConnect from "lib/mongoDBConnect";
import { categoryList } from "@/lib/constants";

export default function CategoryPage({ articles, category }) {
  return (
    <ClientLayout category={category}>
      <main className="col-span-full grid grid-cols-12">
        <HorizontalAd />

        <div className="col-span-full grid grid-cols-8 my-16">
          <div className="col-span-5 col-start-2 ">
            <PaginatedArticles items={articles} type="stack" />
          </div>
          <VerticalAd />
        </div>
      </main>
    </ClientLayout>
  );
}

export async function getStaticPaths() {
  // for static paths/URL

  const paths = categoryList.map((category) => ({
    params: { category: category.value },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  await mongoDBConnect();

  let category = categoryList.find((t) => t.value === params.category);

  const articles = await Articles.find({ category: category.name });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles.reverse())),
      category: category.name,
    },
    // revalidate data every 10 seconds
    revalidate: 10,
  };
}
