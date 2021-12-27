import React from "react";
// import { convertToRaw } from "draft-js";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function RichTextAreaEditor({ editorState, setEditorState }) {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={(editorState) => setEditorState(editorState)}
      toolbarClassName="flex !rounded-t-md"
      editorClassName="px-4 bg-[#fff] shadow-lg min-h-[300px] max-h-[300px] rounded-b-md"
      wrapperClassName="bg-transparent rounded-md mb-4 max-w-full"
      toolbar={{
        options: ["inline", "link", "embedded", "image", "remove", "history"],
      }}
    />
  );
}
