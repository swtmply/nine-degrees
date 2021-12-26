import "../styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session} refetchInterval={5 * 60}>
          <div className="bg-slate-50 min-h-[100vh]">
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
