import "../styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ArticleFieldsProvider } from "@/contexts/ArticleFieldsContext";
import Head from "next/head";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico" />
        <title>9Degrees</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ArticleFieldsProvider>
            <SessionProvider session={session} refetchInterval={5 * 60}>
              <div className="bg-slate-50 min-h-[100vh]">
                <Component {...pageProps} />
              </div>
            </SessionProvider>
          </ArticleFieldsProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
