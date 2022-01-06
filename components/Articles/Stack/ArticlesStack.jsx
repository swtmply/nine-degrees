import Aos from "aos";
import { convertFromRaw } from "draft-js";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { categoryColor } from "../Spread/ArticlesSpread";

export default function ArticlesStack({ article, grid = false }) {
  const firstBlock = convertFromRaw(JSON.parse(article.body)).getFirstBlock();

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="flex mb-52 md:mb-72 mr-4 relative cursor-pointer group w-full sm:w-auto "
    >
      <Link href={`/articles/${article._id}`}>
        <div className="w-[100vw] sm:w-full">
          <div
            className={`${
              !grid ? "sm:w-[450px] 2xl:w-[510px]" : "sm:w-[380px]"
            } relative bg-slate-500 aspect-[1.43/1]`}
          >
            <Image
              src={article.image}
              layout="fill"
              objectFit="cover"
              className="transition-transform group-hover:scale-125"
            />
          </div>
          <div className="absolute md:min-h-[20rem] md:max-h-80 ml-auto mr-auto left-0 right-0 md:-bottom-64 mb-8 flex flex-col justify-center items-center text-center bg-slate-50 rounded-lg p-4 w-[95%]">
            <p
              className={`absolute -top-4 ${categoryColor(
                article.category
              )} text-white text-xs md:text-sm px-8 py-1 rounded font-bold max-w-min`}
            >
              {article.subsection}
            </p>
            <h2 className="font-bold 2xl:text-3xl text-lg md:text-xl">
              {article.title}
            </h2>
            <p className="font-mono font-bold mt-2 text-xs md:text-base">
              By {article.writer}{" "}
              <span className="text-gray-400">
                {moment(article.createdAt).startOf("hour").fromNow()}
              </span>
            </p>
            {!grid ? (
              <p className="mt-5 line-clamp-2 md:line-clamp-4 text-sm">
                {firstBlock.getText()}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
