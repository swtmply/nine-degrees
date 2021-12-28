import { ArticleFieldsContext } from "contexts/ArticleFieldsContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext } from "react";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export default function ArticlePreview() {
  const { data: session } = useSession();
  const {
    useFormValues,
    useEditorState,
    useImage,
    useCategory,
    useTags,
    useImagePreview,
  } = useContext(ArticleFieldsContext);

  const [formValues] = useFormValues;
  const [editorState] = useEditorState;
  const [category] = useCategory;
  const [tags] = useTags;
  const [imagePreview] = useImagePreview;
  const [image] = useImage;

  const rawContentState = JSON.parse(
    JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  );
  const markup = draftToHtml(rawContentState, {});

  return (
    <div className="max-w-[60%] max-h-screen overflow-y-auto">
      <main className="grid grid-cols-12">
        <div className="col-span-full grid grid-cols-8 my-16 relative">
          <div className="col-span-6 col-start-2 flex flex-col justify-center items-center">
            <p className="bg-blue-600 text-white text-sm px-8 py-1 rounded font-bold uppercase">
              {category.name || category}
            </p>
            <h2 className="font-bold text-5xl mt-8 text-center w-[1000px]">
              {formValues.title}
            </h2>
            <p className="font-mono font-bold mt-2">
              By {session?.user?.name}
              <span className="text-gray-400">5 hours ago</span>
            </p>

            <div className="col-span-full w-full aspect-[2/1] relative mt-20 bg-blue-200">
              <Image
                src={
                  imagePreview || "/assets/samples/article-poster.jpg" || image
                }
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className="self-end italic text-gray-400">
              {formValues.caption}
            </p>
          </div>

          <div className="col-span-full grid grid-cols-8 my-16 relative">
            <div className="col-span-5 col-start-2">
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: markup,
                }}
              ></div>

              <div className="flex space-x-2 items-center text-lg my-10">
                <p className="font-bold">TAGS:</p>
                {tags.map((t, i) => (
                  <p key={i}>
                    {t}
                    {i !== tags.length - 1 && ","}
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
                    {session?.user?.name}
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
          </div>
        </div>
      </main>
    </div>
  );
}
