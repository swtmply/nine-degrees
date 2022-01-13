import ArticlePreview from "@/components/ArticlePreview/ArticlePreview";
import ArticleForm from "@/components/Forms/ArticleForm";
import { getSession } from "next-auth/react";

export default function CreateArticlePage() {
  return (
    <div className="w-full max-h-screen flex bg-slate-100">
      <ArticleForm />

      <ArticlePreview />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
