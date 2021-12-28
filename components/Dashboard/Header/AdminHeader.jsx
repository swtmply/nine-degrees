import LoadingBox from "@/components/Loaders/LoadingBox";
import useArticles from "@/hooks/useArticles";
import { titles } from "@/lib/constants";
import { statusLength } from "@/utils/index";
import { useRouter } from "next/router";
import React from "react";

export default function AdminHeader() {
  const router = useRouter();
  const { data, isLoading } = useArticles();

  if (isLoading) return <LoadingBox />;

  return (
    <div className="flex justify-between mt-8">
      {/* Stats */}
      <div className="flex flex-col bg-white p-4 w-[70%] h-44 mb-2 rounded-md">
        <div className=" flex justify-around relative">
          <div className="text-left">
            <p className="font-mono text-8xl">{data?.articles.length}</p>
          </div>
          <div className="text-left">
            <p className="font-mono text-8xl">
              {statusLength(data?.articles, "published")}
            </p>
          </div>
          <div className="text-left">
            <p className="font-mono text-8xl">
              {statusLength(data?.articles, "approved")}
            </p>
          </div>
          <div className="text-left">
            <p className="font-mono text-8xl">
              {statusLength(data?.articles, "pending")}
            </p>
          </div>
          <div className="text-left">
            <p className="font-mono text-8xl">
              {statusLength(data?.articles, "draft")}
            </p>
          </div>
          <div className="text-left">
            <p className="font-mono text-8xl">
              {statusLength(data?.articles, "trash")}
            </p>
          </div>
        </div>
        <div className="bg-yellow-300 w-full py-3 flex justify-evenly rounded-md">
          {titles.map((t, idx) => (
            <div className="text-left ml-8" key={idx}>
              <p className="flex space-x-2">
                {t.component}
                <span>{t.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-white p-4 w-[28%] h-44 mb-2 rounded-md">
        <div className="flex flex-col items-end">
          <p className="font-bold text-2xl mb-4">Good day, bhie!</p>
          <p className="font-bold text-lg text-right leading-5 mb-2">
            Feeling motivated to inspire Bernadette and Jonathan today?
          </p>
          <button
            onClick={() => router.push("/user/articles/create")}
            className="w-full py-3 bg-red-500 font-bold text-lg text-white rounded-md hover:bg-red-600"
          >
            Create Article +
          </button>
        </div>
      </div>
    </div>
  );
}
