import Aos from "aos";
import { convertFromRaw } from "draft-js";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { categoryColor } from "../Spread/ArticlesSpread";

export default function ArticlesStack({ article }) {
  const firstBlock = convertFromRaw(JSON.parse(article.body)).getFirstBlock();

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="flex mb-72 mr-4 relative cursor-pointer group"
    >
      <Link href={`/articles/${article._id}`}>
        <div>
          <div className="relative bg-slate-500 w-[550px] aspect-[1.43/1]">
            <Image
              src={article.image}
              layout="fill"
              objectFit="cover"
              className="transition-transform group-hover:scale-125"
            />
          </div>
          <div className="absolute min-h-[20rem] max-h-80 ml-auto mr-auto left-0 right-0 -bottom-64 mb-8 flex flex-col justify-center items-center text-center bg-stone-200 rounded-lg p-4 w-[95%]">
            <p
              className={`absolute -top-4 ${categoryColor(
                article.category
              )} text-white text-sm px-8 py-1 rounded font-bold max-w-min`}
            >
              {article.subsection}
            </p>
            <h2 className="font-bold text-3xl">{article.title}</h2>
            <p className="font-mono font-bold mt-2">
              By {article.writer}{" "}
              <span className="text-gray-400">
                {moment(article.createdAt).startOf("hour").fromNow()}
              </span>
            </p>
            <p className="mt-5 line-clamp-4">{firstBlock.getText()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
