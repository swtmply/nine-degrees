import AdminArticlePreview from "@/components/ArticlePreview/AdminArticlePreview";
import LoadingBox from "@/components/Loaders/LoadingBox";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { fetchArticle } from ".";

export default function ArticlePreview() {
  const router = useRouter();
  const { data, isLoading } = useQuery(
    ["article", router.query.articleId],
    () => fetchArticle(router.query.articleId)
  );

  if (isLoading) return <LoadingBox />;

  return (
    <div>
      <AdminArticlePreview article={data?.article} />
    </div>
  );
}
