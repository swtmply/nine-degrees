import HorizontalAd from "@/components/Ads/HorizontalAd";
import VerticalAd from "@/components/Ads/VerticalAd";
import ClientLayout from "@/components/Layouts/ClientLayout";
import PaginatedArticles from "@/components/PaginatedArticles/PaginatedArticles";
import { categoryList } from "@/lib/constants";
import Articles from "@/models/Articles";
import mongoDBConnect from "lib/mongoDBConnect";
import React from "react";

export default function SubsectionPage({ articles, category }) {
  return (
    <ClientLayout category={category}>
      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-full grid grid-cols-8 my-16">
          <div className="col-span-full sm:col-span-5 sm:col-start-2">
            <PaginatedArticles items={articles} type="stack" />
          </div>
          <VerticalAd category={category}/>
        </div>
      </main>
    </ClientLayout>
  );
}

export async function getStaticPaths() {
  // for static paths/URL

  let paths = [];

  categoryList.map((category) => {
    category.subsection?.map((subsection) =>
      paths.push({
        params: {
          category: category.value,
          subsection: subsection.value,
        },
      })
    );
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  await mongoDBConnect();

  let category = categoryList.find((t) => t.value === params.category);
  let subsection = category?.subsection?.find(
    (t) => t.value === params.subsection
  );

  const articles = await Articles.find({ subsection: subsection?.name });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles.reverse())),
      category: category.name,
    },
    // revalidate data every 10 seconds
    revalidate: 10,
  };
}
