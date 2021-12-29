import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import { toast, resolveValue, Toaster } from "react-hot-toast";
import { useMutation } from "react-query";

export default function UsersTableDialog({ isOpen, setIsOpen, user }) {
  const { isSuccess, mutate } = useMutation(
    async () => {
      return await axios.delete(`/api/users/${user._id}`);
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
            <Dialog.Title className="font-bold text-2xl flex flex-col px-4">
              <span className="text-sm text-slate-400">
                user ID: {user?._id}
              </span>
              <span>Are you sure you want to delete?</span>
            </Dialog.Title>

            <Dialog.Description className="space-y-3 mt-5 flex flex-col">
              <p className="text-lg px-4 font-semibold">
                {user?.name} - {user?.role}
              </p>
              <div className="flex">
                <button
                  onClick={() => mutate()}
                  className={`bg-red-500 py-2 mx-4 px-4 text-white rounded-md font-bold flex space-x-2`}
                >
                  <TrashIcon className="w-6 h-6 mr-2" />
                  Delete User
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={` py-2 px-4 text-slate-500 rounded-md font-bold flex space-x-2`}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Description>
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
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
