import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Loading from "@/components/Loaders/LoadingBox";
import Logo from "@/components/Dashboard/Logo";
import Sidebar from "@/components/Dashboard/SidebarMenu";
import Header from "@/components/Dashboard/HeaderAdmin";
import Table from "@/components/Dashboard/Table";

export default function index() {
  const { data: session } = useSession();
  const router = useRouter();

  const getMine = () => axios.get("/api/articles/mine").then((res) => res.data);
  const { data: mineArticles, isLoading } = useQuery(["my-articles"], getMine);
  console.log(mineArticles);

  return (
    <div className="relative min-h-screen max-h-screen flex">
      <div className="bg-blue-600 w-64 grid grid-rows-3">
        <div className="pt-6">
          <Logo />
        </div>
        <div className="row-span-2">
          <div className="flex justify-center pt-14">
            <Sidebar />
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="bg-blue-600 flex-1 p-3">
        {/* white container */}
        <div className="flex flex-col rounded-l-lg bg-[#e6e6e6] h-full p-6">
          {/* Header */}
          <div className="pb-9">
            <Header session={session} />
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-5 gap-6">
                {/* filter */}
                <div className="w-full col-start-5">
                  <button
                    className="w-full bg-red-500 text-white py-2 px-5 rounded-xl hover:opacity-75 transition duration-700 ease-in-out"
                    onClick={() => router.push(`/writer/${session?.id}/create`)}
                  >
                    <div>create article +</div>
                  </button>
                </div>
              </div>

              {/* table */}
              <div className="flex-1 max-h-full bg-[#f2f2f2] rounded-2xl mt-4 overflow-y-auto">
                <div className="rounded-md px-3">
                  <div>
                    <Table mine={mineArticles} session={session} />
                    {/* pagination */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* white container */}
      </div>
      {/* main*/}
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
