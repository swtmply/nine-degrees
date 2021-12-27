import { Dialog, Transition } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/solid";
import React from "react";

export default function TableDataDialog({
  isOpen,
  setIsOpen,
  articleId,
  articleStatus,
}) {
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

          <div className="relative bg-white rounded mx-auto p-3">
            <Dialog.Title className="font-bold text-2xl flex flex-col">
              <span className="text-sm text-slate-400">
                Article ID: {articleId}
              </span>
              <span>Edit Article</span>
            </Dialog.Title>

            <Dialog.Description className="space-y-3 mt-5 flex flex-col">
              {/* TODO: add functions */}
              <button className="py-2 px-4 bg-blue-600 text-white rounded-md font-bold flex w-64">
                <PencilAltIcon className="w-6 h-6 mr-2" />
                Edit Article Content
              </button>
              <button
                className={`${
                  articleStatus === "Draft" ? "bg-red-500" : "bg-yellow-400"
                } py-2 px-4 text-white rounded-md font-bold flex w-64`}
              >
                <PencilAltIcon className="w-6 h-6 mr-2" />
                Move to {articleStatus === "Draft" ? "Trash" : "Draft"}
              </button>
            </Dialog.Description>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
