import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Video } from "~/types";
import { getCacheKey } from "~/utils/cache";

export const videosRouter = createTRPCRouter({
  popular: publicProcedure.query(() => getCacheKey<Video[]>("popularVideos")),
  recent: publicProcedure.query(() => getCacheKey<Video[]>("recentVideos")),
});
