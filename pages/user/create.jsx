import ArticlePreview from "@/components/ArticlePreview/ArticlePreview";
import ArticleForm from "@/components/Forms/ArticleForm";
import { ArticleFieldsProvider } from "contexts/ArticleFieldsContext";

export default function CreateArticlePage() {
  return (
    <div className="w-full max-h-screen flex bg-slate-100">
      <ArticleFieldsProvider>
        <ArticleForm />

        <ArticlePreview />
      </ArticleFieldsProvider>
    </div>
  );
}
