import { Dialog, Transition } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { resolveValue, Toaster } from "react-hot-toast";
import { useMutation } from "react-query";

export default function TableDataDialog({ isOpen, setIsOpen, article }) {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log("table data dialog", article)
  const { isLoading, isSuccess, mutate } = useMutation(
    async (data) => {
      return await axios.put(`/api/articles/${article._id}`, data);
    },
    {
      onSuccess: (res) => {
        toast(res.data.message);
        window.location.reload();
      },
      onError: () => {
        toast("Something went wrong.");
      },
    }
  );

  const { isSuccess: successDelete, mutate: mutateDelete } = useMutation(
    async () => {
      return await axios.delete(`/api/articles/${article._id}`);
    },
    {
      onSuccess: (res) => {
        toast(res.data.message);
        window.location.reload();
      },
      onError: () => {
        toast("Something went wrong.");
      },
    }
  );

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-slate-100 rounded py-4">
            <Dialog.Title className="font-bold text-2xl flex justify-between px-4">
              <div className="flex flex-col">
                <span className="text-sm text-slate-400">
                  Article ID: {article?._id}
                </span>
                <span>Edit Article</span>
              </div>
              <button
                onClick={() =>
                  router.push(`/user/articles/${article._id}/preview`)
                }
                className="flex items-center text-slate-700 border border-slate-400 rounded-md px-2 py-1 h-full font-semibold gap-2"
              >
                <EyeIcon className="w-6 h-6" />
                <span>Preview</span>
              </button>
            </Dialog.Title>

            <Dialog.Description className="space-y-3 mt-5 flex flex-col">
              {article?.status === "Trash" ? (
                <TrashEdit
                  article={article}
                  router={router}
                  mutate={mutate}
                  mutateDelete={mutateDelete}
                />
              ) : // change to if article writer == session.user.name
              // ) : session?.user?.name === article?.writer ? (
              session?.user?.role === "Writer" ? (
                <WriterEdit article={article} router={router} mutate={mutate} />
              ) : (
                <HeadEdit
                  article={article}
                  router={router}
                  mutate={mutate}
                  session={session}
                />
              )}
            </Dialog.Description>
            <Toaster>
              {(t) => (
                <Transition
                  appear
                  show={t.visible}
                  className={`${
                    isSuccess || successDelete
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
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

const WriterEdit = ({ article, router, mutate }) => {
  const handleStatusChange = (status) => {
    if (status.toLowerCase() === "draft") {
      mutate({ status: "Trash" });
      return window.location.reload();
    }

    mutate({ status: "Draft" });
    return window.location.reload();
  };

  return (
    <div className="px-4 space-y-2">
      <p>{article.comments}</p>

      <button
        onClick={() => router.push(`/user/articles/${article._id}`)}
        className="py-2 px-4 bg-blue-600 text-white rounded-md font-bold flex w-64"
      >
        <PencilAltIcon className="w-6 h-6 mr-2" />
        Edit Article Content
      </button>
      <button
        onClick={() => handleStatusChange(article.status)}
        className={`${
          article.status === "Draft" ? "bg-red-500" : "bg-yellow-400"
        } py-2 px-4 text-white rounded-md font-bold flex w-64`}
      >
        <PencilAltIcon className="w-6 h-6 mr-2" />
        Move to {article.status === "Draft" ? "Trash" : "Draft"}
      </button>
    </div>
  );
};

import {
  CheckCircleIcon,
  ClipboardCheckIcon,
  DotsCircleHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/solid";

const filterButtons = [
  {
    component: <ClipboardCheckIcon className="w-6 h-6" />,
    name: "Published",
    color: "bg-green-600",
  },
  {
    component: <CheckCircleIcon className="w-6 h-6" />,
    name: "Approved",
    color: "bg-green-500",
  },
  {
    component: <DotsCircleHorizontalIcon className="w-6 h-6" />,
    name: "Pending",
    color: "bg-orange-400",
  },
  {
    component: <PencilAltIcon className="w-6 h-6" />,
    name: "Draft",
    color: "bg-yellow-400",
  },
  {
    component: <TrashIcon className="w-6 h-6" />,
    name: "Trash",
    color: "bg-red-500",
  },
];

import InputField from "components/Input/InputField";
import { EyeIcon } from "@heroicons/react/outline";

const TrashEdit = ({ article, mutate, mutateDelete }) => {
  const handleStatusChange = (status) => {
    mutate({ status });
  };

  return (
    <div className="flex flex-col">
      <p className="self-start px-4 mb-2 mt-5 font-bold text-xl">Actions</p>
      <div className="flex items-center px-4 flex-wrap gap-2 max-w-lg ">
        <button
          onClick={() => handleStatusChange("Draft")}
          className={`bg-green-500 py-2 px-4 text-white rounded-md font-bold flex space-x-2`}
        >
          <PencilAltIcon className="w-6 h-6" />
          <span>Recover Article</span>
        </button>
        <button
          onClick={() => mutateDelete()}
          className={`bg-red-500 py-2 px-4 text-white rounded-md font-bold flex space-x-2`}
        >
          <TrashIcon className="w-6 h-6" />
          <span>Delete Permanently</span>
        </button>
      </div>
    </div>
  );
};

const HeadEdit = ({ article, router, mutate, session }) => {
  const handleStatusChange = (status) => {
    mutate({ status });
  };

  const [comments, setComments] = useState(article?.comments);

  const handleAddComment = () => {
    mutate({ comments });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col px-4">
        <InputField
          label="Comment"
          value={comments}
          onChange={setComments}
          placeholder="Enter Comment"
        />
        <button
          onClick={() => handleAddComment()}
          className="max-w-[49%] py-2 px-4 bg-blue-600 text-white rounded-md font-bold flex items-center self-end w-64"
        >
          <PencilAltIcon className="w-6 h-6 mr-2" />
          <span>Add Comment</span>
        </button>
      </div>
      <p className="self-start px-4 mb-2 mt-5 font-bold text-xl">Actions</p>
      <div className="flex items-center px-4 flex-wrap gap-2 max-w-lg">
        {filterButtons
          .filter((t) => t.name !== article.status)
          .map((b, idx) => (
            <button
              key={idx}
              onClick={() => handleStatusChange(b.name)}
              className={`${b.color} min-w-[49%] py-2 px-4 text-white rounded-md font-bold flex space-x-2`}
            >
              {b.component}
              <span>Move to {b.name}</span>
            </button>
          ))}
        {session?.user.name === article?.writer && (
          <button
            onClick={() => router.push(`/user/articles/${article._id}`)}
            className="max-w-[49%] py-2 px-4 bg-blue-600 text-white rounded-md font-bold flex w-64"
          >
            <PencilAltIcon className="w-6 h-6 mr-2" />
            Edit Article Content
          </button>
        )}
      </div>
    </div>
  );
};
