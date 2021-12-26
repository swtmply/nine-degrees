import IconInputField from "@/components/Input/IconInputField";
import { KeyIcon, MailIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Toaster, toast, resolveValue } from "react-hot-toast";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const status = await signIn("credentials", {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
      callbackUrl: "/admin",
    });

    setIsLoading(false);
    if (status.error) {
      toast(status.error);
    } else {
      router.push(status.url);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="bg-slate-100 p-4 flex flex-col rounded-md">
        <Image src="/assets/logos/full-black.svg" width={150} height={200} />
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-4 min-w-[500px]"
        >
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
          <button
            disabled={isLoading}
            className="bg-black py-2 text-lg text-white font-bold rounded hover:bg-opacity-70 flex justify-center items-center disabled:hover:bg-black"
            onClick={() => {}}
          >
            {isLoading ? (
              <div className="flex space-x-2 items-center h-8">
                <div className="animate-spin text-white relative flex justify-center items-center">
                  <svg height="50" width="50">
                    <circle
                      cx="25"
                      cy="25"
                      r="10"
                      stroke="white"
                      stroke-width="3"
                      fill="transparent"
                    />
                    <rect x="20" y="20" width="20" height="20" fill="black" />
                  </svg>
                </div>
                <p>Loading...</p>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      <Toaster>
        {(t) => (
          <Transition
            appear
            show={t.visible}
            className={`bg-red-100 border-red-400 cursor-texttransform p-4 rounded shadow-lg border-t-4`}
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
