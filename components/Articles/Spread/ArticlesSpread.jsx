import Aos from "aos";
import Image from "next/image";
import React, { useEffect } from "react";

import "aos/dist/aos.css";
import moment from "moment";
import { convertFromRaw } from "draft-js";
import Link from "next/link";

export const categoryColor = (category) => {
  switch (category) {
    case "News":
      return "bg-blue-600";
    case "Features":
      return "bg-pink-400";
    case "Community":
      return "bg-red-400";
    case "Cultures & Lifestyle":
      return "bg-yellow-400";
    case "So Lit!":
      return "bg-green-500";
  }
};

export default function ArticlesSpread({ article }) {
  const firstBlock = convertFromRaw(JSON.parse(article.body)).getFirstBlock();

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div data-aos="fade-up" className="w-full mb-4 cursor-pointer">
      <Link href={`/articles/${article._id}`}>
        <div className="flex space-x-4">
          <div className="relative bg-slate-500 w-[450px] aspect-[1.43/1]">
            <Image src={article.image} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[55%] flex flex-col self-end">
            <p
              className={`${categoryColor(
                article.category
              )} text-white text-sm px-8 py-1 rounded font-bold w-max`}
            >
              {article.category}
            </p>
            <h2 className="font-bold text-3xl mt-8">{article.title}</h2>
            <p className="font-mono font-bold mt-2">
              By: {article.writer}
              <span className="text-gray-400">
                {moment(article.createdAt).startOf("hour").fromNow()}
              </span>
            </p>
            <p className="mt-5 line-clamp-5">{firstBlock.getText()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
