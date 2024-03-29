import { prisma } from "@statslearnbyvideodev/db";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createServerSideHelpers } from "@trpc/react-query/server";

import Head from "next/head";
import SuperJSON from "superjson";
import { appRouter } from "~/server/api/root";

import Dashboard from "~/components/Dashboard";
import Footer from "~/components/ui/Footer";
import Header from "~/components/ui/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>learnbyvideo.dev Stats Dashboard</title>
        <meta
          name="description"
          content="Stats on the latest YouTube dev content"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-3 sm:p-10">
        <Header />
        <Dashboard />
        <Footer />
      </main>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={true} />
      )}
    </>
  );
}

export async function getStaticProps() {
  const ssg = createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: { session: null, prisma },
  });

  await ssg.stats.metrics.prefetch();
  await ssg.stats.videoUploads.prefetch();
  await ssg.videos.popular.prefetch();
  await ssg.videos.recent.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}
