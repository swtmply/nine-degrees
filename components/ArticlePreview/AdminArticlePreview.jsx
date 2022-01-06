import draftToHtml from "draftjs-to-html";
import Image from "next/image";
import React from "react";

export default function AdminArticlePreview({ article }) {
  const rawContentState = JSON.parse(article?.body);
  const markup = draftToHtml(rawContentState, {});

  return (
    <div className="flex min-h-screen">
      <main className="grid grid-cols-12">
        <div className="col-span-full grid grid-cols-8 my-16 relative">
          <div className="col-span-6 col-start-2 flex flex-col justify-center items-center">
            <p className="bg-blue-600 text-white text-sm px-8 py-1 rounded font-bold uppercase">
              {article.category}
            </p>
            <h2 className="font-bold text-5xl mt-8 text-center w-[1000px]">
              {article.title}
            </h2>
            <p className="font-mono font-bold mt-2">
              By {article?.writer}
              <span className="text-gray-400"> 5 hours ago</span>
            </p>

            <div className="col-span-full w-full aspect-[2/1] relative mt-20 bg-blue-200">
              <Image src={article.image} layout="fill" objectFit="cover" />
            </div>
            <p className="self-end italic text-gray-400">{article.caption}</p>
          </div>

          <div className="col-span-full grid grid-cols-8 my-16 relative">
            <div className="col-span-5 col-start-2">
              <div
                className="mt-5 prose-xl markup"
                dangerouslySetInnerHTML={{
                  __html: markup,
                }}
              ></div>

              <div className="flex space-x-2 items-center text-lg my-10">
                <p className="font-bold">TAGS:</p>
                {article.tags.map((t, i) => (
                  <p key={i}>
                    {t}
                    {i !== article.tags.length - 1 && ","}
                  </p>
                ))}
              </div>

              <div className="flex gap-4 max-h-min relative">
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
                    {article?.writer}
                  </p>
                  <p className="text-gray-400">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Minus maiores optio nam eos, asperiores sit enim, odit totam
                    quae provident quia doloremque ut sapiente quibusdam, cum
                    aspernatur tempora distinctio corrupti!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
