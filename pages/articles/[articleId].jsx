import VerticalAd from "@/components/Ads/VerticalAd";
import ClientLayout from "@/components/Layouts/ClientLayout";
import Articles from "@/models/Articles";
import Image from "next/image";
import React from "react";
import mongoDBConnect from "lib/mongoDBConnect";
import moment from "moment";
import draftToHtml from "draftjs-to-html";
import ArticleSwiper from "@/components/Swipers/ArticleSwiper";
import useArticles from "@/hooks/useArticles";
import LoadingBox from "@/components/Loaders/LoadingBox";
import { useQuery } from "react-query";
import axios from "axios";
import { convertFromRaw } from "draft-js";
import Head from "next/head";
import Link from "next/link";
import { categoryColor } from "@/components/Articles/Spread/ArticlesSpread";
import PaginatedArticles from "@/components/PaginatedArticles/PaginatedArticles";

export default function ArticlePage({ article }) {
  const firstBlock = convertFromRaw(JSON.parse(article.body)).getFirstBlock();
  const rawContentState = JSON.parse(article?.body);
  const markup = draftToHtml(rawContentState);

  const { data, isLoading } = useArticles("head", article.category);
  const { data: subsectionData, isLoading: subsectionLoading } = useArticles(
    "subsection",
    article.subsection
  );
  const { data: user, isLoading: userLoading } = useQuery(
    ["user", article?.writer],
    async () => {
      return await axios
        .get(`/api/users?name=${article.writer}`)
        .then((res) => res.data);
    }
  );

  return (
    <ClientLayout category={article.category}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={firstBlock.getText()} />

        <meta property="og:image" content={article.image} key="ogimage" />
        <meta property="og:title" content={article.title} key="ogtitle" />
        <meta
          property="og:description"
          content={firstBlock.getText()}
          key="ogdesc"
        />
        <title>{article.title}</title>
      </Head>
      <main className="col-span-full grid grid-cols-12">
        <div className="md:col-span-full col-span-10 col-start-2 md:col-start-0 grid grid-cols-8 my-16 relative">
          <div className="md:col-span-6 md:col-start-2 col-span-full flex flex-col justify-center items-center">
            <p
              className={`${categoryColor(
                article.category
              )} uppercase text-white text-sm px-8 py-1 rounded font-bold max-w-min`}
            >
              {article.subsection}
            </p>
            <h2 className="font-bold text-3xl md:text-5xl mt-8 text-center md:w-[1000px]">
              {article.title}
            </h2>
            <p className="font-mono font-bold mt-2 text-center md:text-left">
              By {article.writer}
              <span className="text-gray-400">
                {" "}
                {moment(article.createdAt).startOf("hour").fromNow()}
              </span>
            </p>

            <div className="col-span-full sm:w-full w-[100vw] aspect-video sm:aspect-[2/1] relative mt-20">
              <Image src={article.image} layout="fill" objectFit="cover" />
            </div>
            <p className="self-end italic text-gray-400">
              {article.caption}
            </p>
          </div>

          <div className="col-span-full grid grid-cols-8 gap-8 my-16 relative">
            <div className="md:col-span-5 col-span-full md:col-start-2 w-[95%]">
              <div
                className="mt-5 prose-sm markup "
                dangerouslySetInnerHTML={{
                  __html: markup,
                }}
              ></div>

              <div className="flex space-x-2 items-center text-lg my-10">
                <p className="font-bold">TAGS:</p>
                {article.tags.map((t, i) => (
                  <p key={i}>
                    {t}
                    {i !== article.tags.length - 1 && ","}
                  </p>
                ))}
              </div>

              <div className="flex gap-4 max-w-[70%] max-h-min relative">
                {userLoading ? (
                  <LoadingBox />
                ) : (
                  <>
                    <Image
                      src="/assets/cover-story-bg.png"
                      layout="fill"
                      objectFit="cover"
                    />
                    <Link href={`/${user.user._id}`}>
                      <div className="flex gap-4 cursor-pointer">
                        <div className="w-[100px] aspect-square relative">
                          <Image
                            src={
                              user.user.image || "/assets/samples/profile.png"
                            }
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex flex-col w-full justify-center">
                          <p className="font-mono text-lg font-bold">
                            {user?.user.name}
                          </p>
                          <p className="text-gray-400 line-clamp-2">
                            {user.user.bio}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <VerticalAd category={article.category} />
          </div>
        </div>
      </main>

      <div className="col-span-full grid grid-cols-12 p-8 mt-24 bg-black space-y-8">
        {subsectionLoading ? (
          <LoadingBox />
        ) : (
          <>
            <h1 className="text-xl sm:text-3xl col-span-full mx-auto uppercase text-white font-bold w-[90%] h-[100px] lg:max-w-[1280px] text-center relative p-8">
              <Image
                src="/assets/more-from-bg.png"
                layout="fill"
                objectFit="cover"
              />
              More from {article.subsection}
            </h1>
            <div className="col-span-10 col-start-2">
              <ArticleSwiper articles={subsectionData?.articles} />
            </div>
          </>
        )}
      </div>

      {/* TODO I might also like */}
      <section className="col-span-full grid grid-cols-12 mt-8">
        <h1 className="text-xl sm:text-3xl col-span-full mx-auto uppercase text-black font-bold w-[90%] h-[100px] lg:max-w-[1280px] text-center relative p-8">
          <Image src="/assets/ymal-bg.png" layout="fill" objectFit="cover" />
          You Might Also Like
        </h1>
        <div className="col-span-full grid grid-cols-8 my-16">
          <div className="col-span-5 sm:col-start-2">
            <PaginatedArticles
              items={data?.articles}
              type="stack"
              grid={true}
            />
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}

export async function getStaticPaths() {
  await mongoDBConnect();

  const articles = await Articles.find({ status: "Published" });

  const paths = articles.map((article) => {
    return {
      params: { articleId: article._id.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  await mongoDBConnect();

  const article = await Articles.findById(params.articleId);

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
    // revalidate data every 10 seconds
    revalidate: 10,
  };
}
