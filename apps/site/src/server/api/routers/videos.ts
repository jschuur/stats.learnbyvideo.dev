import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const videosRouter = createTRPCRouter({
  popular: publicProcedure.query(() => []),
  //   .query(({ ctx }) =>
  //   ctx.prisma.video.findMany({
  //     where: {
  //       publishedAt: {
  //         gte: new Date(
  //           (new Date() as unknown as number) - 60 * 60 * 24 * 7 * 1000
  //         ),
  //       },
  //     },
  //     orderBy: {
  //       viewCount: "desc",
  //     },
  //     select: {
  //       title: true,
  //       youtubeId: true,
  //       viewCount: true,
  //       publishedAt: true,
  //       channel: {
  //         select: {
  //           channelName: true,
  //           youtubeId: true,
  //         },
  //       },
  //     },
  //     take: 100,
  //   })
  recent: publicProcedure.query(
    () => []
    // ({ ctx }) =>
    // ctx.prisma.video.findMany({
    //   orderBy: {
    //     publishedAt: "desc",
    //   },
    //   select: {
    //     title: true,
    //     youtubeId: true,
    //     viewCount: true,
    //     publishedAt: true,
    //     channel: {
    //       select: {
    //         channelName: true,
    //         youtubeId: true,
    //       },
    //     },
    //   },
    //   take: 100,
    // })
  ),
});
