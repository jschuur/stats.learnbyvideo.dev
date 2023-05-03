import { getCacheKey } from "~/cache/cache";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Video } from "~/types";

export const videosRouter = createTRPCRouter({
  popular: publicProcedure.query(() => getCacheKey<Video[]>("popularVideos")),
  recent: publicProcedure.query(() => getCacheKey<Video[]>("recentVideos")),
});
