import React from "react";
import { useMutation } from "react-query";

export default function FormButton({ title, onSubmit, variables, ...rest }) {
  const mutation = useMutation(onSubmit);

  return (
    <button
      className={`${mutation.isLoading && "disabled:opacity-75"}`}
      disabled={mutation.isLoading}
      onClick={async () => {
        mutation.mutate(variables);
      }}
      {...rest}
    >
      {mutation.isLoading ? "Loading..." : title}
    </button>
  );
}
