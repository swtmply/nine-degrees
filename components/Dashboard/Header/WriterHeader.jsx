import LoadingBox from "@/components/Loaders/LoadingBox";
import useMyArticles from "@/hooks/useMyArticles";
import { titles } from "@/lib/constants";
import { statusLength } from "@/utils/index";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import CreateBackground from "../../../public/assets/create-article-bg.png";

export default function WriterHeader() {
  const router = useRouter();
  const { data, isLoading } = useMyArticles();

  if (isLoading) return <></>;

  return (
    <div className="grid grid-cols-6 gap-4 mt-8 col-span-full">
      {/* Stats */}
      <div className="flex flex-col bg-white p-4 col-span-4 h-40 mb-2 rounded-md">
        <div className="mb-2 grid grid-cols-6 auto-rows-auto place-items-center">
          <p className="text-7xl">{data?.articles.length}</p>

          <p className="text-7xl">
            {statusLength(data?.articles, "published")}
          </p>

          <p className="text-7xl">{statusLength(data?.articles, "approved")}</p>

          <p className="text-7xl">{statusLength(data?.articles, "pending")}</p>

          <p className="text-7xl">{statusLength(data?.articles, "draft")}</p>

          <p className="text-7xl">{statusLength(data?.articles, "trash")}</p>
        </div>
        <div className="bg-yellowwallow rounded-md grid grid-cols-6 auto-rows-auto place-items-center py-3">
          {titles.map((t, idx) => (
            <div className="" key={idx}>
              <p className="flex space-x-1">
                {t.component}
                <span>{t.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-white col-span-3 col-start-5 h-40 mb-2 rounded-md relative">
        <div className="relative overflow-hidden">
          <Image src={CreateBackground} />
        </div>
        <div className="flex flex-col items-end p-4 absolute min-w-full">
          <p className="font-bold text-2xl mb-1">Good day, bhie!</p>
          <p className="text-base text-right leading-5 mb-2">
            Feeling motivated to inspire <p>Bernadette and Jonathan today?</p>
          </p>
          <button
            onClick={() => router.push("/user/articles/create")}
            className="w-full py-2 bg-red-500 font-bold text-lg text-white rounded-md hover:bg-red-600"
          >
            Create Article +
          </button>
        </div>
      </div>
    </div>
  );
}
