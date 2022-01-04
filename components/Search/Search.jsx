import useArticles from "@/hooks/useArticles";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Search() {
  const { data } = useArticles();

  const [filteredArticles, setfilteredArticles] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setfilteredArticles([]);
    } else {
      const filteredArray = data?.articles.filter((value) => {
        return value.title.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setfilteredArticles(filteredArray);
    }
  };

  return (
    <div className="h-16 md:w-[500px] flex items-center justify-start relative">
      <input
        className="text-white bg-transparent placeholder:text-white outline-none text-xl font-mono px-2 py-2 w-full border-b-2 border-white focus:border-yellow-200"
        type="text"
        onChange={handleFilter}
        placeholder="Search something..."
      />
      {filteredArticles.length !== 0 && (
        <div className="absolute max-h-[70vh] w-full top-0 mt-16 z-50 bg-yellowwallow rounded overflow-y-scroll">
          {filteredArticles
            .filter((t) => t.status === "Published")
            .map((article) => {
              return (
                <Link href={`/articles/${article._id} `} key={article._id}>
                  <div className="flex items-center hover:bg-gray-200 hover:bg-opacity-50 p-4 space-x-6 cursor-pointer">
                    <div className="w-8 h-8 rounded-full relative">
                      <span className="opacity-0">image placeholder</span>
                      <Image
                        className="rounded-full"
                        src={article.image}
                        alt={"small article image"}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="text-black font-semibold">{article.title}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
