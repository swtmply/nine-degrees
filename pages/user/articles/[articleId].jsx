import ArticlePreview from "@/components/ArticlePreview/ArticlePreview";
import EditArticleForm from "@/components/Forms/EditArticleForm";
import LoadingBox from "@/components/Loaders/LoadingBox";
import axios from "axios";
import { ArticleFieldsProvider } from "contexts/ArticleFieldsContext";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const fetchArticle = async (id) => {
  return await axios.get(`/api/articles/${id}`).then((res) => res.data);
};

export default function EditArticlePage() {
  const router = useRouter();
  const { data, isLoading } = useQuery(
    ["article", router.query.articleId],
    () => fetchArticle(router.query.articleId)
  );

  if (isLoading) return <LoadingBox />;

  return (
    <div className="w-full max-h-screen flex bg-slate-100">
      <ArticleFieldsProvider>
        <EditArticleForm article={data.article} />

        <ArticlePreview />
      </ArticleFieldsProvider>
    </div>
  );
}
