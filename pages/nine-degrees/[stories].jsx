import ClientLayout from "@/components/Layouts/ClientLayout";
import { stories } from "@/lib/cover-stories";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function Story({ article, aindex }) {
  const index = parseInt(aindex);

  return (
    <ClientLayout category={"nine-degrees"}>
      {index !== 8 && (
        <section className="col-span-full min-h-screen relative">
          <Image
            src={article.images[5]}
            layout="fill"
            objectFit="cover"
            priority={true}
            className="bg-top"
          />
        </section>
      )}
      <main className="col-span-full grid grid-cols-12">
        <div className="md:col-span-full col-span-10 col-start-2 md:col-start-0 grid grid-cols-8 my-16 relative">
          <div className="md:col-span-6 md:col-start-2 col-span-full flex flex-col justify-center items-center">
            <p
              className={`bg-black min-w-max uppercase text-white text-sm px-8 py-1 rounded font-bold max-w-min`}
            >
              Cover Story
            </p>
            <h2 className="font-bold text-3xl md:text-5xl mt-8 text-center md:w-[1000px]">
              {article.title}
            </h2>
            <p className="font-mono font-bold mt-2 text-center md:text-left">
              By 9Degrees Team
              <span className="text-gray-400"> 5 hours ago</span>
            </p>
          </div>

          <div className="col-span-full grid grid-cols-8 gap-8 my-16 relative">
            <div className="md:col-span-6 col-span-full md:col-start-2 text-xl">
              {article.paragraphs[0].split("\n").map((str) => (
                <p className="mt-5">{str}</p>
              ))}
              {index !== 8 && (
                <div className="flex justify-between gap-4 my-5">
                  <div className="w-[50%] max-h-screen aspect-[9/16] relative">
                    <Image
                      src={article.images[1]}
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                    />
                  </div>
                  <div className="w-[50%] max-h-screen aspect-[9/16] relative">
                    <Image
                      src={article.images[2]}
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                    />
                  </div>
                </div>
              )}

              {article?.paragraphs[1]?.split("\n").map((str) => (
                <p className="mt-5">{str}</p>
              ))}
              {index !== 8 && (
                <div className="flex flex-col items-center gap-4 my-5">
                  <div className="w-[85%] max-h-[170vh] aspect-[9/16] relative">
                    <Image
                      src={article.images[3]}
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                    />
                  </div>
                  <div className="w-[85%] max-h-[170vh] aspect-[9/16] relative">
                    <Image
                      src={article.images[4]}
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                    />
                  </div>
                </div>
              )}

              {article?.paragraphs[2]?.split("\n").map((str) => (
                <p className="mt-5">{str}</p>
              ))}
              <div className="flex flex-col items-center gap-4 mt-10">
                <Image
                  src="/assets/logos/iconmark-black.svg"
                  height={50}
                  width={50}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {index !== 8 && (
        <main className="col-span-full grid grid-cols-12">
          <div className="md:col-span-full col-span-10 col-start-2 md:col-start-0 grid grid-cols-8 my-16 relative">
            <section className="md:col-span-6 md:col-start-2 col-span-full flex flex-col justify-center ">
              <div className="col-span-10 col-start-3 flex flex-col my-16 relative text-xl">
                <p>
                  Photography and Creative Direction by
                  <span className="font-bold"> Kimpoy Albalate</span>
                </p>
                <p>
                  Fashion and Beauty Direction by
                  <span className="font-bold"> Jaymar Aquino</span>
                </p>
                <p>
                  Make-up, Hair, and Styling by
                  <span className="font-bold">
                    {" "}
                    Gea Adlag, Khiel Flores, Cheska Lapus
                  </span>
                </p>
                <p>
                  Shoot Coordination
                  <span className="font-bold">
                    {" "}
                    Ailla dela Cruz and MJ Catequista
                  </span>
                </p>
                <p>
                  Set and Production Design by
                  <span className="font-bold"> Kimpoy Albalate</span>
                </p>
                <p>
                  Shot on location at
                  <span className="font-bold"> A+ Studios</span>
                </p>
              </div>
            </section>
          </div>
        </main>
      )}

      <section className="col-span-full h-80 relative">
        {index !== 8 ? (
          <Image src={article.images[5]} layout="fill" objectFit="cover" />
        ) : (
          <Image
            src="/covers/Joanna_cover.jpg"
            layout="fill"
            objectFit="cover"
          />
        )}

        <div className="w-full h-32 relative">
          <Image
            src="/assets/Read Next Graphics.png"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative text-white flex flex-col items-center mt-10">
          <Link
            href={
              index !== 8 ? `/nine-degrees/${index + 1}` : "/nine-degrees/0"
            }
          >
            <p className="text-3xl cursor-pointer">Read Next</p>
          </Link>
          <h2 className="text-6xl">
            {index !== 8 ? stories[index + 1]?.title : stories[0].title}
          </h2>
        </div>
      </section>
    </ClientLayout>
  );
}

export async function getStaticPaths() {
  // for static paths/URL
  const paths = stories.map((_, idx) => ({
    params: { stories: idx.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = stories[params.stories];

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
      aindex: params.stories,
    },
  };
}
