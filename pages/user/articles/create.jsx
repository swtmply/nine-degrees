import ArticlePreview from "@/components/ArticlePreview/ArticlePreview";
import ArticleForm from "@/components/Forms/ArticleForm";

export default function CreateArticlePage() {
  return (
    <div className="w-full max-h-screen flex bg-slate-100">
      <ArticleForm />

      <ArticlePreview />
    </div>
  );
}
