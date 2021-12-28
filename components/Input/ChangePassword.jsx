import React, { useState } from "react";
import InputField from "./InputField";

export default function ChangePassword({ formValues, setFormValues }) {
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <InputField
        label="Password"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        name="password"
        type="password"
        disabled={disabled}
        onChange={setFormValues}
        formValues={formValues}
      />
      {disabled ? (
        <button
          // disabled={isLoading}
          className=" py-2 text-lg text-slate-500 font-bold rounded"
          onClick={() => setDisabled(!disabled)}
        >
          {/* {isLoading ? "Saving..." : "Save"} */}
          Change Password
        </button>
      ) : (
        <button
          // disabled={isLoading}
          className=" py-2 text-lg text-slate-500 font-bold rounded"
          onClick={() => {
            setDisabled(!disabled);
            setFormValues({ ...formValues, password: "" });
          }}
        >
          {/* {isLoading ? "Saving..." : "Save"} */}
          Cancel
        </button>
      )}
    </div>
  );
}
