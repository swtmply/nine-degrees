import VerticalAd from "@/components/Ads/VerticalAd";
import ClientLayout from "@/components/Layouts/ClientLayout";
import Image from "next/image";
import React from "react";

export default function ArticlePage() {
  return (
    <ClientLayout>
      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-full grid grid-cols-8 my-16 relative">
          <div className="col-span-6 col-start-2 flex flex-col justify-center items-center">
            <p className="bg-blue-600 text-white text-sm px-8 py-1 rounded font-bold max-w-min">
              NEWS
            </p>
            <h2 className="font-bold text-5xl mt-8 text-center w-[1000px]">
              SOLIDIFYING KPOP-WAVE: 6 rookie groups to check out in 2022
            </h2>
            <p className="font-mono font-bold mt-2">
              By Sheldeen Joy Talavera{" "}
              <span className="text-gray-400">5 hours ago</span>
            </p>

            <div className="col-span-full w-full aspect-[2/1] relative mt-20">
              <Image
                src="/assets/samples/article-poster.jpg"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <div className="col-span-full grid grid-cols-8 my-16 relative">
            <div className="col-span-5 col-start-2">
              <p className="mt-5">
                Korean popular music, or simply K-pop, has grown undeniable
                success in the past years. To date, it’s not just in Asia but
                other parts of the world. This music and entertainment scene
                became one of the major influences of Hallyu or the Korean Wave,
                while idol groups such as...
              </p>

              <div className="flex space-x-2 items-center text-lg my-10">
                <p className="font-bold">TAGS:</p>
                <p>Music</p>
                <p>K-pop</p>
                <p>Korea</p>
                <p>aespa</p>
                <p>enhypen</p>
              </div>

              <div className="flex gap-4 max-w-[70%] max-h-min relative">
                <Image
                  src="/assets/cover-story-bg.png"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="w-[100px] aspect-square relative ">
                  <Image
                    src="/assets/samples/PUBMAT SAMPLE.jpg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col w-full justify-center">
                  <p className="font-mono text-lg font-bold">
                    Sheldeen Joy Talavera
                  </p>
                  <p className="text-gray-400">
                    Sheldeen is a writer who loves to watch series and to play
                    with her dogs in her free time — ways to pause and take a
                    break. She also aims to write to advocate for animal welfare
                    and rights.
                  </p>
                </div>
              </div>
            </div>
            <VerticalAd />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
