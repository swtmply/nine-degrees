import React, { useContext, useEffect } from "react";
import InputField from "../Input/InputField";
import RichTextAreaEditor from "../Input/RichTextAreaEditor/RichTextAreaEditor";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import ImageInput from "../Input/ImageInput";
import { useSession } from "next-auth/react";
import uploadImage from "@/lib/uploadImage";
import { ArticleFieldsContext } from "contexts/ArticleFieldsContext";
import { useMutation } from "react-query";
import axios from "axios";
import { Toaster, toast, resolveValue } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export default function EditArticleForm({ article }) {
  const { data: session } = useSession();
  const {
    useFormValues,
    useEditorState,
    useImagePreview,
    useCategory,
    useTags,
    useImage,
  } = useContext(ArticleFieldsContext);
  const router = useRouter();

  const [formValues, setFormValues] = useFormValues;

  const [editorState, setEditorState] = useEditorState;
  const [imagePreview, setImagePreview] = useImagePreview;
  const [image, setImage] = useImage;
  const [category, setCategory] = useCategory;
  const [tags, setTags] = useTags;

  useEffect(() => {
    setFormValues({
      title: article.title,
      caption: article.caption,
    });
    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(article.body)))
    );
    setImagePreview(article.image);
    setCategory(article.category);
    setTags(article.tags);
  }, []);

  const { isLoading, isSuccess, mutate } = useMutation(
    async (data) => {
      return await axios.put(`/api/articles/${article._id}`, data);
    },
    {
      onSuccess: (res) => {
        toast("Article Saved");
      },
      onError: () => {
        toast("Something went wrong.");
      },
    }
  );

  const handleSubmit = async () => {
    if (image) {
      const upload = await uploadImage(image);
      formValues.image = upload.url;
    }
    formValues.body = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    formValues.writer = session?.user?.name;

    // console.log(formValues);

    mutate(formValues);

    // if (isSuccess) window.location.reload();
    // console.log(formValues);
  };

  return (
    <div className="w-[40%] max-w-[800px] min-h-screen bg-slate-200 px-4 overflow-y-auto">
      <Toaster>
        {(t) => (
          <Transition
            appear
            show={t.visible}
            className={`${
              isSuccess
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            } cursor-texttransform p-4 rounded shadow-lg border-t-4`}
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            {resolveValue(t.message)}
          </Transition>
        )}
      </Toaster>

      <div className="bg-slate-200 h-16 sticky top-0 flex justify-end items-center space-x-2 z-50">
        <button
          className="text-slate-500 font-bold text-lg mr-2"
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </button>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="bg-blue-600 px-8 py-2 text-lg text-white font-bold rounded disabled:bg-blue-300 disabled:cursor-default hover:bg-blue-700"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>

      <p className="text-base text-slate-400 uppercase tracking-wide font-bold">
        text
      </p>

      <InputField
        label="Title"
        placeholder="Enter title"
        name="title"
        onChange={setFormValues}
        formValues={formValues}
      />

      <RichTextAreaEditor
        editorState={editorState}
        setEditorState={setEditorState}
      />

      <p className="text-base text-slate-400 uppercase tracking-wide font-bold mb-4">
        image
      </p>

      <ImageInput image={image} setImage={setImage} />

      <InputField
        label="Caption"
        placeholder="Enter image caption"
        name="caption"
        onChange={setFormValues}
        formValues={formValues}
      />

      {/* <p className="text-base text-slate-400 uppercase tracking-wide font-bold mb-4">
        article information
      </p>

      <SelectInput
        selectItems={categoryList}
        selected={category}
        setSelected={setCategory}
      />

      <RadioGroupInput
        category={category}
        selectedSubsection={subsection}
        setselectedSubsection={setSubsection}
      />

      <TagsInputField
        label="Tags"
        name="tags"
        onChange={setTags}
        value={tags}
      /> */}
    </div>
  );
}
