import Aos from "aos";
import Image from "next/image";
import React, { useEffect } from "react";

export default function ArticlesStack() {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div data-aos="fade-up" className="flex mb-72 mr-4 relative">
      <div className="relative bg-slate-500 w-[550px] aspect-[1.43/1]">
        <Image
          src="/assets/samples/article-poster.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute ml-auto mr-auto left-0 right-0 -bottom-64 flex flex-col justify-center items-center text-center bg-stone-200 rounded-lg p-4 w-[95%]">
        <p className="absolute -top-4 bg-blue-600 text-white text-sm px-8 py-1 rounded font-bold max-w-min">
          NEWS
        </p>
        <h2 className="font-bold text-3xl mt-8">
          SOLIDIFYING KPOP-WAVE: 6 rookie groups to check out in 2022
        </h2>
        <p className="font-mono font-bold mt-2">
          By Sheldeen Joy Talavera{" "}
          <span className="text-gray-400">5 hours ago</span>
        </p>
        <p className="mt-5 line-clamp-4">
          Korean popular music, or simply K-pop, has grown undeniable success in
          the past years. To date, it’s not just in Asia but other parts of the
          world. This music and entertainment scene became one of the major
          influences of Hallyu or the Korean Wave, while idol groups such as...
        </p>
      </div>
    </div>
  );
}
