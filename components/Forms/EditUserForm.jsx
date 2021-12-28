import { categoryList } from "@/lib/constants";
import { Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { resolveValue, Toaster, toast } from "react-hot-toast";
import { useMutation } from "react-query";
import Checkbox from "../Input/CheckboxInput";
import SelectInput from "../Input/SelectInput";

export const updateUser = async (data) => {
  return await axios.put(`/api/users/${data.id}`, data).then((res) => res.data);
};

export default function EditUserForm({ user }) {
  const [role, setRole] = useState({ name: user?.role, value: user?.role });
  const [categories, setCategories] = useState(user?.categories);
  const router = useRouter();

  const { mutate, isSuccess } = useMutation(updateUser, {
    onSuccess: (res) => {
      toast("User update Successfully");
      window.location.reload();
    },
    onError: (err) => {
      toast("Something went wrong");
    },
  });

  const handleSubmit = () => {
    mutate({ role: role.name, categories, id: user?._id });
  };

  return (
    <div>
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
            src={user?.image || "/assets/samples/PUBMAT SAMPLE.jpg"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="font-bold text-3xl">{user?.name}</h2>
        <div className="w-[50%]">
          <SelectInput
            selectItems={[
              { name: "Writer", value: "Writer" },
              { name: "Head", value: "Head" },
            ]}
            selected={role}
            setSelected={setRole}
          />
          <Checkbox
            items={categoryList}
            selectedCategories={categories}
            setSelectedCategories={setCategories}
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
            className="bg-blue-600 px-8 py-2 text-lg text-white font-bold rounded disabled:bg-blue-300 disabled:cursor-default hover:bg-blue-700"
          >
            {/* {isLoading ? "Saving..." : "Save"} */}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
