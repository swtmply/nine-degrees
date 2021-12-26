import IconInputField from "@/components/Input/IconInputField";
import {
  InformationCircleIcon,
  KeyIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "react-query";

import { Toaster, toast, resolveValue } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import axios from "axios";

export const createUser = async (data) => {
  return await axios.post("/api/auth/signup", data);
};

export default function Register() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const mutation = useMutation(createUser, {
    onSuccess: (res) => {
      toast(res.data.message);
    },
    onError: (err) => {
      toast("Email is already taken.");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(formValues);

    e.target.reset();
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="bg-slate-100 p-4 flex flex-col rounded-md">
        <Image src="/assets/logos/full-black.svg" width={150} height={200} />
        <form
          onSubmit={onSubmit}
          className="flex flex-col space-y-4 min-w-[500px]"
        >
          <IconInputField
            icon={UserIcon}
            name="name"
            type="text"
            placeholder="Enter name..."
            onChange={setFormValues}
            formValues={formValues}
          />
          <IconInputField
            icon={MailIcon}
            name="email"
            type="email"
            placeholder="Enter email..."
            onChange={setFormValues}
            formValues={formValues}
          />
          <IconInputField
            icon={KeyIcon}
            name="password"
            type="password"
            placeholder="Enter password..."
            onChange={setFormValues}
            formValues={formValues}
          />
          <IconInputField
            icon={InformationCircleIcon}
            name="role"
            type="text"
            placeholder="Enter role... (Writer or Head)"
            onChange={setFormValues}
            formValues={formValues}
          />
          <button
            disabled={mutation.isLoading}
            className="bg-black py-2 text-lg text-white font-bold rounded cursor-pointer hover:bg-opacity-70 disabled:bg-opacity-70 disabled:cursor-default"
            type="submit"
          >
            {mutation.isLoading ? "Submitting..." : "Sign up"}
          </button>
        </form>
      </div>

      <Toaster>
        {(t) => (
          <Transition
            appear
            show={t.visible}
            className={`${
              mutation.isSuccess
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
  );
}
