import { CloudUploadIcon } from "@heroicons/react/outline";
import { ArticleFieldsContext } from "contexts/ArticleFieldsContext";
import React, { useContext, useState } from "react";

export default function ImageInput({ image, setImage }) {
  const [hover, setHover] = useState(false);
  const { useImagePreview } = useContext(ArticleFieldsContext);
  const [imagePreview, setImagePreview] = useImagePreview;

  return (
    <div className="flex flex-col w-full justify-between rounded-md">
      {/* Image Input needs styling */}
      <span className="font-bold text-2xl mb-2">File Upload</span>

      <label
        className="relative w-full bg-white rounded-md shadow-md"
        htmlFor="imageInput"
      >
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`flex justify-center items-center w-full border-4 space-x-4 border-dashed rounded-md py-4 ${
            hover
              ? "border-blue-600 text-blue-600"
              : "border-gray-500 text-gray-500"
          }`}
        >
          <CloudUploadIcon className="w-8 h-8" />
          <p className="font-bold text-lg ">
            {image?.name || "Click to upload an image (.jpg, .png, .jpeg)"}
          </p>
        </div>
      </label>

      <input
        className="hidden outline-none"
        type="file"
        accept=".jpg, .png, .jpeg"
        name="image"
        id="imageInput"
        onChange={(e) => {
          // get the image file format
          const file = e.target.files[0];

          // setImage for upload
          setImage(file);

          // for image preview
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            // image preview
            setImagePreview(reader.result);
          };
        }}
      />
    </div>
  );
}
