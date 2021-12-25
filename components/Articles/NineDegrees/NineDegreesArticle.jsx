import Image from "next/image";
import React from "react";

export default function NineDegreesArticle() {
  return (
    <div className="col-span-full min-h-[420px] relative mb-32">
      <Image src="/assets/cover-story-bg.png" layout="fill" objectFit="cover" />
      <div className="w-[80%] h-full flex justify-center space-x-4">
        <div className="bg-slate-400 w-[350px] h-full relative">
          <Image
            src="/assets/samples/PUBMAT SAMPLE.jpg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col self-end max-w-[600px]">
          <p className="bg-black text-white text-sm px-8 py-1 rounded font-bold max-w-max">
            Cover Story
          </p>
          <h2 className="font-bold text-3xl mt-8">
            SOLIDIFYING KPOP-WAVE: 6 rookie groups to check out in 2022
          </h2>
          <p className="font-mono font-bold mt-2">
            9Degrees
            <span className="text-gray-400 ml-2">5 hours ago</span>
          </p>
          <p className="mt-5">
            Korean popular music, or simply K-pop, has grown undeniable success
            in the past years. To date, it’s not just in Asia but other parts of
            the world. This music and entertainment scene became one of the
            major influences of Hallyu or the Korean Wave, while idol groups
            such as...
          </p>
          <button className="font-bold bg-black text-white px-8 py-2 mt-4 max-w-max">
            Continue Reading &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
