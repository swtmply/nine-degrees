import { createContext, useState } from "react";
import { EditorState } from "draft-js";
import { categoryList } from "@/lib/constants";

const ArticleFieldsContext = createContext();

const ArticleFieldsProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    title: "Enter Title",
    caption: "Image Caption",
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(categoryList[0]);
  const [subsection, setSubsection] = useState();
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState();

  return (
    <ArticleFieldsContext.Provider
      value={{
        useFormValues: [formValues, setFormValues],
        useEditorState: [editorState, setEditorState],
        useImage: [image, setImage],
        useCategory: [category, setCategory],
        useSubsection: [subsection, setSubsection],
        useTags: [tags, setTags],
        useImagePreview: [imagePreview, setImagePreview],
      }}
    >
      {children}
    </ArticleFieldsContext.Provider>
  );
};

export { ArticleFieldsContext, ArticleFieldsProvider };
