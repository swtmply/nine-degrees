import { ArticleFieldsContext } from "@/contexts/ArticleFieldsContext";
import uploadImage from "@/lib/uploadImage";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { resolveValue, Toaster, toast } from "react-hot-toast";
import { useMutation } from "react-query";
import ChangePassword from "../Input/ChangePassword";
import ImageInput from "../Input/ImageInput";
import InputField from "../Input/InputField";
import { updateUser } from "./EditUserForm";

export default function EditMeForm({ user }) {
  const [formValues, setFormValues] = useState({
    name: user?.name,
    email: user?.email,
    bio: user?.bio,
    image: user?.image,
    categories: user?.categories,
    facebook: user?.socials.facebook,
    twitter: user?.socials.twitter,
    instagram: user?.socials.instagram,
  });
  const router = useRouter();

  const { useImagePreview, useImage } = useContext(ArticleFieldsContext);
  const [image, setImage] = useImage;
  const [imagePreview, setImagePreview] = useImagePreview;

  const { mutate, isSuccess, isLoading } = useMutation(updateUser, {
    onSuccess: (res) => {
      toast("User update Successfully");
      setImagePreview(null);
      window.location.reload();
    },
    onError: (err) => {
      toast("Something went wrong");
    },
  });

  const handleSubmit = async () => {
    if (imagePreview) {
      const upload = await uploadImage(image);
      formValues.image = upload.url;
    }

    // console.log({
    //   ...formValues,
    //   socials: {
    //     facebook: formValues.facebook,
    //     twitter: formValues.twitter,
    //     instagram: formValues.instagram,
    //   },
    //   id: user?._id,
    // });

    mutate({
      ...formValues,
      socials: {
        facebook: formValues.facebook,
        twitter: formValues.twitter,
        instagram: formValues.instagram,
      },
      id: user?._id,
    });
  };

  return (
    <div className="col-span-6 col-start-4">
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
      <div className="flex flex-col gap-4 items-center">
        <div className="h-80 w-80 bg-red-200 relative">
          <Image
            src={
              imagePreview ||
              formValues.image ||
              "/assets/samples/PUBMAT SAMPLE.jpg"
            }
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="w-[100%]">
          <InputField
            label="Name"
            placeholder="Enter name"
            name="name"
            onChange={setFormValues}
            formValues={formValues}
          />
          <InputField
            label="Bio"
            placeholder="Enter bio"
            name="bio"
            onChange={setFormValues}
            formValues={formValues}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            name="email"
            onChange={setFormValues}
            formValues={formValues}
          />
          <ChangePassword
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </div>
        <div className="w-[100%]">
          <ImageInput image={image} setImage={setImage} />
        </div>
        <div className="w-[100%]">
          <InputField
            label="Facebook"
            placeholder="Facebook Link"
            name="facebook"
            onChange={setFormValues}
            formValues={formValues}
          />
          <InputField
            label="Twitter"
            placeholder="Twitter Link"
            name="twitter"
            onChange={setFormValues}
            formValues={formValues}
          />
          <InputField
            label="Instagram"
            placeholder="Instagram Link"
            name="instagram"
            onChange={setFormValues}
            formValues={formValues}
          />
        </div>
        <div className="flex gap-2">
          <button
            // disabled={isLoading}
            className="px-8 py-2 text-lg text-slate-500 font-bold rounded"
            onClick={() => router.back()}
          >
            {/* {isLoading ? "Saving..." : "Save"} */}
            Cancel
          </button>
          <button
            // disabled={isLoading}
            onClick={handleSubmit}
            className="bg-padeepBlue px-8 py-2 text-lg text-white font-bold rounded disabled:bg-blue-300 disabled:cursor-default hover:bg-blue-700"
          >
            {/* {isLoading ? "Saving..." : "Save"} */}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
