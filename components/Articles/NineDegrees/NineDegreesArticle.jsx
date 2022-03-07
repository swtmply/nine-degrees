import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function NineDegreesArticle({ story, index }) {
  const router = useRouter();

  return (
    <div className="col-span-full min-h-[420px] mb-32 bg-[url('/assets/cover-story-bg.png')] bg-cover">
      <div className="w-[80%] h-full flex flex-col sm:flex-row justify-center space-x-4 z-10">
        {parseInt(index) !== 8 ? (
          <div className="bg-slate-400 md:w-[350px] w-screen h-64 sm:h-full relative px-2">
            <Image
              src={story.images[0]}
              layout="fill"
              objectFit="cover"
              loading="eager"
            />
          </div>
        ) : (
          <div className="bg-transparent w-[350px] h-64 sm:h-full relative" />
        )}
        <div className="flex flex-col self-end max-w-[600px]">
          <p className="bg-black text-white text-sm px-8 py-1 mt-4 rounded font-bold max-w-max">
            Cover Story
          </p>
          <h2 className="font-bold text-3xl mt-8">{story.title}</h2>
          <p className="font-mono font-bold mt-2">
            9Degrees Team
            <span className="text-gray-400 ml-2">5 hours ago</span>
          </p>
          {story.paragraphs[0].split("\n").map((str) => (
            <p className="mt-2">{str}</p>
          ))}
          <button
            onClick={() => {
              router.push(`/nine-degrees/${index}`);
            }}
            className="font-bold bg-black text-white px-8 py-2 mt-4 max-w-max hover:bg-yellowwallow"
          >
            Continue Reading &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
