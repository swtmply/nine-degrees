import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import DashboardStatistics from "@/components/Dashboard/DashboardStatistics";
import Loading from "@/components/Loaders/LoadingBox";
import Logo from "@/components/Dashboard/Logo";
import Sidebar from "@/components/Dashboard/SidebarMenu";
import Header from "@/components/Dashboard/HeaderAdmin";
import Table from "@/components/Dashboard/Table";

//TO DO
//custom scrollbar
//pagination sa may articles
//loading effect
//responsive

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const getArticles = async () =>
    await axios.get("/api/articles").then((res) => res.data);
  const { data, isLoading } = useQuery(["articles"], getArticles);

  const getMine = async () =>
    await axios.get("/api/articles/mine").then((res) => res.data);
  const { data: allMine, isLoading: loadingMine } = useQuery(
    ["mine-articles"],
    getMine
  );

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
              <div className="grid grid-cols-8 gap-6">
                {/* stats */}
                <div className="font-helvetica bg-[#ffffff] col-span-6 rounded-2xl">
                  <div className="p-3">
                    <DashboardStatistics
                      all={data}
                      mine={allMine}
                      session={session}
                    />
                  </div>
                </div>

                {/* create */}
                <div className="w-full bg-[#ffffff] col-span-2 rounded-2xl">
                  <div className="p-3 space-y-2">
                    <div className="text-right font-bold">
                      <span className="font-helvetiva text-xl block">
                        Good day, bhie!
                      </span>
                      <div className="text-sm">
                        <div>Feeling motivated to inspire</div>
                        <span className="block">
                          Bernadette and Jonathan today?
                        </span>
                      </div>
                    </div>

                    <div>
                      <button
                        className="w-full bg-red-500 text-white py-2 px-5 rounded-xl hover:opacity-75 transition duration-650 ease-in-out"
                        onClick={() =>
                          router.push(`/writer/${session?.id}/create`)
                        }
                      >
                        <div>create article +</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* table */}
              <div className="flex-1 max-h-full bg-[#f2f2f2] rounded-2xl mt-6 overflow-y-auto">
                <div className="rounded-md px-3">
                  <div>
                    <Table all={data} mine={allMine} session={session} />
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
