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

export default function ArticlePage({ article }) {
  const rawContentState = JSON.parse(article?.body);
  const markup = draftToHtml(rawContentState, {});

  const { data, isLoading } = useArticles("head", article.category);
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
      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-full grid grid-cols-8 my-16 relative">
          <div className="col-span-6 col-start-2 flex flex-col justify-center items-center">
            <p className="bg-blue-600 uppercase text-white text-sm px-8 py-1 rounded font-bold max-w-min">
              {article.subsection}
            </p>
            <h2 className="font-bold text-5xl mt-8 text-center w-[1000px]">
              {article.title}
            </h2>
            <p className="font-mono font-bold mt-2">
              By {article.writer}
              <span className="text-gray-400">
                {" "}
                {moment(article.createdAt).startOf("hour").fromNow()}
              </span>
            </p>

            <div className="col-span-full w-full aspect-[2/1] relative mt-20">
              <Image src={article.image} layout="fill" objectFit="cover" />
            </div>
          </div>

          <div className="col-span-full grid grid-cols-8 gap-8 my-16 relative">
            <div className="col-span-5 col-start-2 w-[95%]">
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
                    <div className="w-[100px] aspect-square relative ">
                      <Image
                        src={
                          user.user.image || "/assets/samples/PUBMAT SAMPLE.jpg"
                        }
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col w-full justify-center">
                      <p className="font-mono text-lg font-bold">
                        {user?.user.name}
                      </p>
                      <p className="text-gray-400">{user.user.bio}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <VerticalAd />
          </div>
        </div>
      </main>

      <div className="col-span-full grid grid-cols-12 h-[80vh] mt-24 bg-black space-y-8">
        {isLoading ? (
          <LoadingBox />
        ) : (
          <>
            <h1 className="text-3xl col-span-full mx-auto my-8 uppercase text-white font-bold w-[90%] h-[100px] lg:max-w-[1280px] text-center relative p-8">
              <Image
                src="/assets/cover-story-bg.png"
                layout="fill"
                objectFit="cover"
              />
              More from {article.subsection}
            </h1>
            <div className="col-span-10 col-start-2">
              <ArticleSwiper articles={data?.articles} />
            </div>
          </>
        )}
      </div>
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
