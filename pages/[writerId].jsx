import ClientLayout from "@/components/Layouts/ClientLayout";
import VerticalAd from "@/components/Ads/VerticalAd";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import PaginatedArticles from "@/components/PaginatedArticles/PaginatedArticles";
import LoadingBox from "@/components/Loaders/LoadingBox";
import Image from "next/image";

export default function WriterPage() {
  const router = useRouter().query.writerId;
  const { data, isLoading: userIsLoading } = useQuery(
    ["user", router],
    async () => {
      return await axios.get(`/api/users/${router}`).then((res) => res.data);
    },
    { enabled: !!router }
  );

  const { data: articlesData, isLoading } = useQuery(
    ["aritcles", data?.user?.name],
    async () => {
      return await axios
        .get(`/api/articles?writer=${data?.user?.name}`)
        .then((res) => res.data);
    },
    {
      enabled: !!data?.user,
    }
  );

  if (userIsLoading && isLoading) return <LoadingBox />;

  return (
    <ClientLayout>
      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-full grid grid-cols-8 my-16">
          <div className="col-span-5 col-start-2 flex flex-col sm:flex-row items-end gap-4">
            <div className="h-64 aspect-square relative">
              <Image
                src={data?.user.image || "/assets/samples/PUBMAT SAMPLE.jpg"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col w-full justify-center">
              <p className="font-mono text-xl font-bold">{data?.user.name}</p>
              <p className="text-gray-400">{data?.user.bio}</p>
            </div>
          </div>
        </div>

        <div className="col-span-full grid grid-cols-8 my-16">
          <div className="col-span-5 col-start-2 ">
            <PaginatedArticles items={articlesData?.articles} type="stack" />
          </div>
          <VerticalAd />
        </div>
      </main>
    </ClientLayout>
  );
}
